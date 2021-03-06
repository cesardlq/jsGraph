"use strict";

define( [ './graph.serie', '../graph.util', '../mixins/graph.mixin.errorbars' ], function( GraphSerieNonInstanciable, util, ErrorBarMixin ) {

  /** 
   * @class SerieScatter
   * @static
   * @augments Serie
   * @example graph.newSerie( name, options, "scatter" );
   * @see Graph#newSerie
   */
  var GraphSerieScatter = function() {}
  $.extend( GraphSerieScatter.prototype, GraphSerieNonInstanciable.prototype, {

    /**
     * @name SerieScatterDefaultOptions
     * @object
     * @static
     */
    defaults: {

    },

    /**
     * Initializes the seriesfsdfsdasdasd
     * @memberof SerieScatter.prototype
     * @private
     */
    init: function( graph, name, options ) {

      var self = this;

      this.graph = graph;
      this.name = name;

      this.id = Math.random() + Date.now();

      this.shapes = []; // Stores all shapes

      this.shown = true;
      this.options = $.extend( true, {}, GraphSerieScatter.prototype.defaults, options );
      this.data = [];
      util.mapEventEmission( this.options, this );

      this._isMinOrMax = {
        x: {
          min: false,
          max: false
        },
        y: {
          min: false,
          max: false
        }
      };

      this.groupPoints = document.createElementNS( this.graph.ns, 'g' );
      this.groupMain = document.createElementNS( this.graph.ns, 'g' );

      this.additionalData = {};

      this.selectedStyleGeneral = {};
      this.selectedStyleModifiers = {};
      /*
      this.groupPoints.addEventListener('mouseover', function(e) {
      
      });


      this.groupPoints.addEventListener('mouseout', function(e) {
      
      });
*/

      this.groupPoints.addEventListener( 'mouseover', function( e ) {
        var id = parseInt( $( e.target ).parent().attr( 'data-shapeid' ) );
        self.emit( "mouseover", id, self.data[ id * 2 ], self.data[ id * 2 + 1 ] );
      } );

      this.groupPoints.addEventListener( 'mouseout', function( e ) {
        var id = parseInt( $( e.target ).parent().attr( 'data-shapeid' ) );
        self.emit( "mouseout", id, self.data[ id * 2 ], self.data[ id * 2 + 1 ] );
      } );

      this.minX = Number.MAX_VALUE;
      this.minY = Number.MAX_VALUE;
      this.maxX = Number.MIN_VALUE;
      this.maxY = Number.MIN_VALUE;

      this.groupMain.appendChild( this.groupPoints );
      this.currentAction = false;

      if ( this.initExtended1 ) {
        this.initExtended1();
      }

      this.styles = {};
      this.styles.unselected = {};
      this.styles.selected = {};

      this.styles.unselected.default = {
        shape: 'circle',
        cx: 0,
        cy: 0,
        r: 3,
        stroke: 'transparent',
        fill: "black"
      };

      this.styles.selected.default = {
        shape: 'circle',
        cx: 0,
        cy: 0,
        r: 4,
        stroke: 'transparent',
        fill: "black"
      };

    },

    /** 
     * Sets data to the serie. The data serie is the same one than for a line serie, however the object definition is not available here
     * @memberof SerieScatter.prototype
     * @see GraphSerie#setData
     */
    setData: function( data, oneDimensional, type ) {

      var z = 0,
        x,
        dx,
        oneDimensional = oneDimensional || "2D",
        type = type || 'float',
        arr,
        total = 0,
        continuous;

      this.empty();
      this.shapesDetails = [];
      this.shapes = [];

      if ( !data instanceof Array ) {
        return this;
      }

      if ( data instanceof Array && !( data[ 0 ] instanceof Array ) ) { // [100, 103, 102, 2143, ...]
        oneDimensional = "1D";
      }

      var _2d = ( oneDimensional == "2D" );

      arr = this._addData( type, _2d ? data.length * 2 : data.length );

      z = 0;

      for ( var j = 0, l = data.length; j < l; j++ ) {

        if ( _2d ) {
          arr[ z ] = ( data[ j ][ 0 ] );
          this._checkX( arr[ z ] );
          z++;
          arr[ z ] = ( data[ j ][ 1 ] );
          this._checkY( arr[ z ] );
          z++;
          total++;
        } else { // 1D Array
          arr[ z ] = data[ j ];
          this[ j % 2 == 0 ? '_checkX' : '_checkY' ]( arr[ z ] );
          z++;
          total += j % 2 ? 1 : 0;

        }
      }

      this.dataHasChanged();
      this.graph.updateDataMinMaxAxes();

      this.data = arr;

      return this;
    },

    /**
     * Removes all DOM points
     * @private
     * @memberof SerieScatter.prototype
     */
    empty: function() {

      while ( this.groupPoints.firstChild ) {
        this.groupPoints.removeChild( this.groupPoints.firstChild );
      }
    },

    /**
     * Sets style to the scatter points
     * First argument is the style applied by default to all points
     * Second argument is an array of modifiers that allows customization of any point of the scatter plot. Data for each elements of the array will augment <code>allStyles</code>, so be sure to reset the style if needed.
     * All parameters - except <code>shape</code> - will be set as parameters to the DOM element of the shape
     *
     * @example
     * var modifiers = [];
     * modifiers[ 20 ] = { shape: 'circle', r: 12, fill: 'rgba(0, 100, 255, 0.3)', stroke: 'rgb(0, 150, 255)' };
     * serie.setStyle( { shape: 'circle', r: 2, fill: 'rgba(255, 0, 0, 0.3)', stroke: 'rgb(255, 100, 0)' }, modifiers ); // Will modify scatter point n°20
     *
     * @memberof SerieScatter.prototype
     * @param {Object} allStyles - The general style for all markers
     * @param {Object} [ modifiers ] - The general style for all markers
     * @param {String} [ selectionMode="unselected" ] - The selection mode to which this style corresponds. Default is unselected
     *
     */
    setStyle: function( all, modifiers, mode ) {

      if ( typeof modifiers == "string" ) {
        mode = modifiers;
        modifiers = false;
      }

      if ( mode === undefined ) {
        mode = "unselected"
      }
      /*
      if( ! this.styles[ mode ] ) {

      }

      if ( mode !== "selected" && mode !== "unselected" ) {
        throw "Style mode is not correct. Should be selected or unselected";
      }
*/
      this.styles[ mode ] = this.styles[ mode ] ||  {};
      this.styles[ mode ].all = all;
      this.styles[ mode ].modifiers = modifiers;

      this.styleHasChanged( mode );

      return this;
    },

    /**
     * Redraws the serie
     * @private
     * @memberof SerieScatter.prototype
     *
     * @param {force} Boolean - Forces redraw even if the data hasn't changed
     */
    draw: function( force ) { // Serie redrawing

      if ( !force && !this.hasDataChanged() && !this.hasStyleChanged( 'unselected' ) ) {
        return;
      }

      var x,
        y,
        xpx,
        ypx,
        j = 0,
        k,
        m,
        currentLine,
        max,
        self = this;

      this._drawn = true;

      this.dataHasChanged( false );
      this.styleHasChanged( false );

      this.groupMain.removeChild( this.groupPoints );

      var incrXFlip = 0;
      var incrYFlip = 1;

      if ( this.getFlip() ) {
        incrXFlip = 1;
        incrYFlip = 0;
      }

      var totalLength = this.data.length / 2;
      var keys = [];

      j = 0, k = 0, m = this.data.length;

      if ( this.error ) {
        this.errorDrawInit();
      }

      for ( ; j < m; j += 2 ) {

        xpx = this.getX( this.data[ j + incrXFlip ] );
        ypx = this.getY( this.data[ j + incrYFlip ] );

        var valY = this.data[ j + incrYFlip ],
          coordY;

        if ( this.error ) {
          this.errorAddPoint( j, this.data[ j + incrXFlip ], this.data[ j + incrYFlip ], xpx, ypx );
        }

        this.shapesDetails[ j / 2 ] = this.shapesDetails[ j / 2 ] || [];
        this.shapesDetails[ j / 2 ][ 0 ] = xpx;
        this.shapesDetails[ j / 2 ][ 1 ] = ypx;
        keys.push( j / 2 );

        //this.shapes[ j / 2 ] = this.shapes[ j / 2 ] ||  undefined;
      }

      if ( this.error ) {
        this.errorDraw();
      }

      // This will automatically create the shapes      
      this.applyStyle( "unselected", keys );

      this.groupMain.appendChild( this.groupPoints );
    },

    _addPoint: function( xpx, ypx, k ) {

      var g = document.createElementNS( this.graph.ns, 'g' );
      g.setAttribute( 'transform', 'translate(' + xpx + ', ' + ypx + ')' );
      g.setAttribute( 'data-shapeid', k );

      if ( this.extraStyle && this.extraStyle[ k ] ) {

        shape = this.doShape( g, this.extraStyle[ k ] );

      } else if ( this.stdStylePerso ) {

        shape = this.doShape( g, this.stdStylePerso );

      } else {

        shape = this.doShape( g, this.stdStyle );
      }

      this.shapes[ k ] = shape;
      this.groupPoints.appendChild( g );
    },

    doShape: function( group, shape ) {
      var el = document.createElementNS( this.graph.ns, shape.shape );
      group.appendChild( el );
      return el;
    },

    getStyle: function( selection, index ) {

      var selection = selection || 'unselected';
      var indices;

      var styles = {};

      if ( typeof index == "number" ) {
        indices = [ index ];
      } else if ( Array.isArray( index ) ) {
        indices = index;
      }

      var shape, index, modifier, style, j; // loop variables
      var styleAll;

      if ( this.styles[ selection ].all !== undefined ) {

        styleAll = this.styles[ selection ].all;

        if ( typeof styleAll == "function" ) {

          styleAll = styleAll();

        } else if ( styleAll === false ) {

          styleAll = {};

        }
      }

      var i = 0,
        l = indices.length;

      for ( ; i < l; i++ ) {

        index = indices[ i ];
        shape = this.shapes[ index ];

        if ( ( modifier = this.styles[ selection ].modifiers ) && ( typeof modifier == "function" || modifier[  index ] ) ) {

          if ( typeof modifier == "function" ) {

            style = modifier( index, shape );

          } else if ( modifier[  index ] ) {

            style = modifier[ index ];

          }

          var tmp = $.extend( {}, styleAll, style );
          style = $.extend( style, tmp );

        } else if ( styleAll !== undefined ) {

          style = styleAll;

        } else {

          style = this.styles[ selection ].default;

        }

        if ( !shape ) { // Shape doesn't exist, let's create it

          var g = document.createElementNS( this.graph.ns, 'g' );
          g.setAttribute( 'data-shapeid', index );
          this.shapes[ index ] = this.doShape( g, style );
          this.groupPoints.appendChild( g );
          shape = this.shapes[ index ];
        }

        shape.parentNode.setAttribute( 'transform', 'translate(' + this.shapesDetails[ index ][ 0 ] + ', ' + this.shapesDetails[ index ][ 1 ] + ')' );

        styles[ index ] = style;
      }

      return styles;
    },

    applyStyle: function( selection, index ) {

      var i, j;
      var styles = this.getStyle( selection, index );

      for ( i in styles ) {

        for ( j in styles[ i ] ) {

          if ( j !== "shape" ) {

            if ( styles[ i ][ j ] ) {

              this.shapes[ i ].setAttribute( j, styles[ i ][ j ] );

            } else {

              this.shapes[ i ].removeAttribute( j );

            }

          }

        }

      }

    },

    unselectPoint: function( index ) {
      this.selectPoint( index, false );

    },

    selectPoint: function( index, setOn, selectionType ) {

      if ( this.shapesDetails[ index ][ 2 ] && this.shapesDetails[ index ][ 2 ] == selectionType ) {
        return;
      }

      if ( typeof setOn == "string" ) {
        selectionType = setOn;
        setOn = undefined;
      }

      if ( Array.isArray( index ) ) {
        return this.selectPoints( index );
      }

      if ( this.shapes[ index ] && this.shapesDetails[ index ] ) {

        if ( ( this.shapesDetails[ index ][ 2 ] || setOn === false ) && setOn !== true ) {

          var selectionStyle = this.shapesDetails[ index ][ 2 ];
          this.shapesDetails[ index ][ 2 ] = false;

          var allStyles = this.getStyle( selectionStyle, index );

          for ( var i in allStyles[ index ] ) {
            this.shapes[ index ].removeAttribute( i );
          }

          this.applyStyle( "unselected", index );

        } else {

          selectionType = selectionType ||  "selected";
          this.shapesDetails[ index ][ 2 ] = selectionType;

          this.applyStyle( selectionType, index );

        }

      }

    }

  } );

  ErrorBarMixin.call( GraphSerieScatter.prototype ); // Add error bar mixin

  return GraphSerieScatter;
} );