<script src="../dist/jquery.min.js"></script>
<script src="../dist/jsgraph.js"></script>

<script>
var serie1 = [-1,-20.499747544838275,-0.95,-20.499659532985874,-0.8999999999999999,-20.499540838115898,-0.8499999999999999,-20.49938076340126,-0.7999999999999998,-20.499164882847428,-0.7499999999999998,-20.4988737412163,-0.6999999999999997,-20.498481100712695,-0.6499999999999997,-20.497951576424207,-0.5999999999999996,-20.497237447419362,-0.5499999999999996,-20.49627435611903,-0.4999999999999996,-20.494975508366757,-0.4499999999999996,-20.493223851506187,-0.39999999999999963,-20.490861525550883,-0.34999999999999964,-20.48767563678195,-0.29999999999999966,-20.483379071684652,-0.24999999999999967,-20.477584622168607,-0.19999999999999968,-20.469770090226536,-0.1499999999999997,-20.45923122725008,-0.09999999999999969,-20.44501826687575,-0.049999999999999684,-20.425850331676905,3.191891195797325e-16,-20.4,0.05000000000000032,-20.365137630064282,0.10000000000000032,-20.318121411753218,0.15000000000000033,-20.25471422548477,0.20000000000000034,-20.16920179137358,0.25000000000000033,-20.053877696141516,0.3000000000000003,-19.89834888820463,0.3500000000000003,-19.68859905188818,0.4000000000000003,-19.405725451695528,0.4500000000000003,-19.024235410553235,0.5000000000000003,-18.509748899999998,0.5500000000000004,-17.81590019886833,0.6000000000000004,-16.88015939675398,0.6500000000000005,-15.618197174567083,0.7000000000000005,-13.916285014032407,0.7500000000000006,-11.621045940111184,0.8000000000000006,-8.52563212933044,0.8500000000000006,-4.351083704794043,0.9000000000000007,1.2788112346498295,0.9500000000000007,8.87142097487483,1.0000000000000007,19.11099441051224,1.0500000000000007,32.920325817120975,1.1000000000000008,51.543917424350724,1.1500000000000008,76.66013443300987,1.2000000000000008,110.53245992908506,1.2500000000000009,156.21348084543214,1.300000000000001,217.8199882640481,1.350000000000001,300.90398420341603,1.400000000000001,412.9530301645426,1.450000000000001,564.065029038078];
var serie2 = [-1,20.499747544838275,-0.95,19.47467655633658,-0.8999999999999999,18.449586754304306,-0.8499999999999999,17.424473648891066,-0.7999999999999998,16.39933190627794,-0.7499999999999998,15.37415530591222,-0.6999999999999997,14.34893677049888,-0.6499999999999997,13.323668524675728,-0.5999999999999996,12.29834246845161,-0.5499999999999996,11.272950895865458,-0.4999999999999996,10.247487754183371,-0.4499999999999996,9.221950733177776,-0.39999999999999963,8.196344610220345,-0.34999999999999964,7.170686472873675,-0.29999999999999966,6.145013721505388,-0.24999999999999967,5.1193961555421446,-0.19999999999999968,4.0939540180453005,-0.1499999999999997,3.0688846840875055,-0.09999999999999969,2.0445018266875685,-0.049999999999999684,1.0212925165838387,3.191891195797325e-16,-6.511458039426543e-15,0.05000000000000032,-1.0182568815032207,0.10000000000000032,-2.0318121411753283,0.15000000000000033,-3.038207133822722,0.20000000000000034,-4.033840358274723,0.25000000000000033,-5.013469424035386,0.3000000000000003,-5.969504666461395,0.3500000000000003,-6.891009668160868,0.4000000000000003,-7.7622901806782165,0.4500000000000003,-8.560905934748961,0.5000000000000003,-9.254874450000004,0.5500000000000004,-9.798745109377588,0.6000000000000004,-10.128095638052397,0.6500000000000005,-10.151828163468611,0.7000000000000005,-9.741399509822692,0.7500000000000006,-8.715784455083394,0.8000000000000006,-6.820505703464357,0.8500000000000006,-3.6984211490749392,0.9000000000000007,1.1509301111848473,0.9500000000000007,8.427849926131096,1.0000000000000007,19.110994410512255,1.0500000000000007,34.56634210797705,1.1000000000000008,56.69830916678583,1.1500000000000008,88.15915459796142,1.2000000000000008,132.63895191490218,1.2500000000000009,195.26685105679033,1.300000000000001,283.16598474326275,1.350000000000001,406.22037867461194,1.400000000000001,578.1342422303601,1.450000000000001,817.8942921052137]
</script>

## Introduction


In this tutorial, we will review the basics of jsGraph, through examples and explanations. This tutorial isn't meant to be thorough in every aspect of jsGraph, but rather show you what can be done in a couple of lines of code. Links to more comprehensive tutorials will be given along the text.


## Setting up jsGraph

jsGraph depends only on jQuery to work. Include both files inside your ```head``` tag to make it work.

``` 
{@lang xml}	<script type="text/javascript" src="path/to/jquery/jquery.min.js"> </script>
	<script type="text/javascript" src="path/to/jsgraph/jsgraph.min.js"> </script>
```

In this situation, jsGraph exposes only the constructor ```Graph``` to the global scope. Everything else is done from there.

Alternatively, is you use an AMD loader, jsGraph may be loaded accordingly
```
	require( [ 'jquery', 'path/to/jsgraph.min' ], function( $, jsGraph ) {
		...
	} )
```

## The data format


For starters, it is useful to discuss briefly the format of data that can be used. All the points in all the series available in jsGraph contain coordinates as point vectors defined as ```(x,y)```. Since bar charts or pie charts are not supported, <code>x</code> and <code>y</code> must be numbers.

We review now the three main ways to define data:

* One-dimensional x/y array:
```javascript
	var data = [ x1, y1, x2, y2, ..., xj, yj, ..., xn, yn ];
```

* Array of x/y pairs:
```javascript
	var data = [ [ x1, y1 ], [ x2, y2 ], ..., [ xj, yj ], ..., [ xn, yn ] ];
```

* Object of uniformely spaced y data
```javascript
	var data = { x0: _x0, dx: _dx, y: [ y1, y2, ..., yj, ..., yn ] };
```
where x0 is the starting x value (corresponding to y1), and dx is the horizontal increment value between each y value. This data definition is only available for line series.


## Creating a graph


Before we start, we will use the following data throughout the tutorial. You can copy it to run on your side too.

```
var serie1 = [-1,-20.499747544838275,-0.95,-20.499659532985874,-0.8999999999999999,-20.499540838115898,-0.8499999999999999,-20.49938076340126,-0.7999999999999998,-20.499164882847428,-0.7499999999999998,-20.4988737412163,-0.6999999999999997,-20.498481100712695,-0.6499999999999997,-20.497951576424207,-0.5999999999999996,-20.497237447419362,-0.5499999999999996,-20.49627435611903,-0.4999999999999996,-20.494975508366757,-0.4499999999999996,-20.493223851506187,-0.39999999999999963,-20.490861525550883,-0.34999999999999964,-20.48767563678195,-0.29999999999999966,-20.483379071684652,-0.24999999999999967,-20.477584622168607,-0.19999999999999968,-20.469770090226536,-0.1499999999999997,-20.45923122725008,-0.09999999999999969,-20.44501826687575,-0.049999999999999684,-20.425850331676905,3.191891195797325e-16,-20.4,0.05000000000000032,-20.365137630064282,0.10000000000000032,-20.318121411753218,0.15000000000000033,-20.25471422548477,0.20000000000000034,-20.16920179137358,0.25000000000000033,-20.053877696141516,0.3000000000000003,-19.89834888820463,0.3500000000000003,-19.68859905188818,0.4000000000000003,-19.405725451695528,0.4500000000000003,-19.024235410553235,0.5000000000000003,-18.509748899999998,0.5500000000000004,-17.81590019886833,0.6000000000000004,-16.88015939675398,0.6500000000000005,-15.618197174567083,0.7000000000000005,-13.916285014032407,0.7500000000000006,-11.621045940111184,0.8000000000000006,-8.52563212933044,0.8500000000000006,-4.351083704794043,0.9000000000000007,1.2788112346498295,0.9500000000000007,8.87142097487483,1.0000000000000007,19.11099441051224,1.0500000000000007,32.920325817120975,1.1000000000000008,51.543917424350724,1.1500000000000008,76.66013443300987,1.2000000000000008,110.53245992908506,1.2500000000000009,156.21348084543214,1.300000000000001,217.8199882640481,1.350000000000001,300.90398420341603,1.400000000000001,412.9530301645426,1.450000000000001,564.065029038078];
var serie2 = [-1,20.499747544838275,-0.95,19.47467655633658,-0.8999999999999999,18.449586754304306,-0.8499999999999999,17.424473648891066,-0.7999999999999998,16.39933190627794,-0.7499999999999998,15.37415530591222,-0.6999999999999997,14.34893677049888,-0.6499999999999997,13.323668524675728,-0.5999999999999996,12.29834246845161,-0.5499999999999996,11.272950895865458,-0.4999999999999996,10.247487754183371,-0.4499999999999996,9.221950733177776,-0.39999999999999963,8.196344610220345,-0.34999999999999964,7.170686472873675,-0.29999999999999966,6.145013721505388,-0.24999999999999967,5.1193961555421446,-0.19999999999999968,4.0939540180453005,-0.1499999999999997,3.0688846840875055,-0.09999999999999969,2.0445018266875685,-0.049999999999999684,1.0212925165838387,3.191891195797325e-16,-6.511458039426543e-15,0.05000000000000032,-1.0182568815032207,0.10000000000000032,-2.0318121411753283,0.15000000000000033,-3.038207133822722,0.20000000000000034,-4.033840358274723,0.25000000000000033,-5.013469424035386,0.3000000000000003,-5.969504666461395,0.3500000000000003,-6.891009668160868,0.4000000000000003,-7.7622901806782165,0.4500000000000003,-8.560905934748961,0.5000000000000003,-9.254874450000004,0.5500000000000004,-9.798745109377588,0.6000000000000004,-10.128095638052397,0.6500000000000005,-10.151828163468611,0.7000000000000005,-9.741399509822692,0.7500000000000006,-8.715784455083394,0.8000000000000006,-6.820505703464357,0.8500000000000006,-3.6984211490749392,0.9000000000000007,1.1509301111848473,0.9500000000000007,8.427849926131096,1.0000000000000007,19.110994410512255,1.0500000000000007,34.56634210797705,1.1000000000000008,56.69830916678583,1.1500000000000008,88.15915459796142,1.2000000000000008,132.63895191490218,1.2500000000000009,195.26685105679033,1.300000000000001,283.16598474326275,1.350000000000001,406.22037867461194,1.400000000000001,578.1342422303601,1.450000000000001,817.8942921052137]
```

(For information, ```serie1``` represents a solar cell j-V curve, while ```serie2``` represents its calculated power output)

Let us first display ```serie1``` on a new graph.


```
var g = new Graph("example-1") // Creates a new graph

g.resize( 400, 300 ); // Resizes the graph

var s = g.newSerie() // Creates a new seire
 .autoAxis() // Assigns automatic axes to the serie
 .setData( serie1 ); // Assigns the data to the serie

g.draw(); // Draws the whole thing

```
<div id="example-1" class="jsgraph-example"></div>
<script>
var g = new Graph("example-1") // Creates a new graph

g.resize( 400, 300 ); // Resizes the graph

g.newSerie() // Creates a new seire
 .autoAxis() // Assigns automatic axes to the serie
 .setData( serie1 ); // Assigns the data to the serie
g.draw();
</script>

And here is the description of the example taken line by line:

* ```new Graph( "example-1" )```. This line effectively creates a new graph. The first parameter here is the id of the DOM element where the graph should be located. Note that ```new Graph( document.getElementByID( "example-1" ) )``` would have been ok too. See {@link Graph} for more details. The graph is stored in the variable ```g```
* ```g.resize( 400, 300 );``` You need to notify to jsGraph the size of your container through the ```resize``` method (see {@link Graph#resize}). First parameter is the width in pixels, second is the height in pixels
* ```g.newSerie()``` This method creates a new serie **and returns it**. jsGraph is chainable, so you can directly append {@link Serie} methods to it.
* ```.autoAxis()``` jsGraph works with multiple horizontal and vertical axes. Use {@link Serie#autoAxis} to assign the default ```x```and ```y```axis.
* ```.setData( serie1 )``` will simply assign the variable ```serie1``` as the data for this serie
* ```g.draw();``` will trigger a redraw of the graph. For efficiency purposes, you will be required to call this method whenever you want a repaint to occur. Some methods have automatic repaint, but this is not the rule. Repainting is typically the most time consuming operation for the browser if you have large amounts of data (when it matters), so jsGraph keeps it to a minimum and lets you decide when the graph should be repainted.

Let us do some styling of the serie now. For instance, we shall display the serie in red, with a thicker line. While we are at it, let's also display a marker for each data point.

```
s
 .setLineColor( 'red' )
 .setLineWidth( 2 )
 .setMarkers( );

g.draw();
```

<div id="example-2" class="jsgraph-example"></div>
<script>

var g = new Graph("example-2") // Creates a new graph

g.resize( 400, 300 ); // Resizes the graph

s = g.newSerie() // Creates a new seire
 .autoAxis() // Assigns automatic axes to the serie
 .setData( serie1 ); // Assigns the data to the serie

s
 .setLineColor( 'red' )
 .setLineWidth( 2 )
 .setMarkers( );

g.draw();

</script>

However, we'd like to change the style of the default markers:

```
s.setMarkers({
	strokeWidth: 1,
	strokeColor: 'rgb( 200, 0, 0 )',
	fillColor: 'white'
});
```

<div id="example-3" class="jsgraph-example"></div>
<script>

var g = new Graph("example-3") // Creates a new graph

g.resize( 400, 300 ); // Resizes the graph

s = g.newSerie()
 .autoAxis()
 .setData( serie1 )
 .setLineColor( 'red' )
 .setLineWidth( 2 )
 .setMarkers({
	strokeWidth: 1,
	strokeColor: 'rgb( 200, 0, 0 )',
	fillColor: 'white'
 });

g.draw();

</script>

More advanced marker description will be covered in an advanced tutorial.
We will cover the axes in more details in the following text, but for now, you might be interesting in simply labeling your axis and setting units:

```
g.getXAxis().setLabel( "Voltage (V)" );
g.getYAxis().setLabel( "Current density" ).setUnit( "mA cm^-2" );
```

<div id="example-4" class="jsgraph-example"></div>
<script>

var g = new Graph("example-4") // Creates a new graph

g.resize( 400, 300 ); // Resizes the graph

s = g.newSerie()
 .autoAxis()
 .setData( serie1 )
 .setLineColor( 'red' )
 .setLineWidth( 2 )
 .setMarkers({
	strokeWidth: 1,
	strokeColor: 'rgb( 200, 0, 0 )',
	fillColor: 'white'
 });

g.getXAxis().setLabel( "Voltage" ).setUnit( "V" );
g.getYAxis().setLabel( "Current density" ).setUnit( "mA cm^-2" );

g.draw();

</script>

Plotting multiple series
-------------

Before plotting the second serie, you need to understand the following:

**Each serie must have a unique name**

The name of the serie is actually the first parameter in the {@link Graph#newSerie} method. In our previous examples, the name was empty, which is ok if you have only one serie. But starting at the second one, you'll need to start naming them.

For example, let's us assume that you have

```
g.newSerie("myName").autoAxis().setData( data1 );
g.newSerie("myName").autoAxis().setData( data2 );
```

This example would not throw any warning, but the second ```g.newSerie("myName")``` would actually return the existing serie. The only thing you will end up doing is overwriting the data of the first serie (```data1```) with ```data2```. jsGraph doesn't throw any error because in the end, you will end up being too lazy to check if a serie exists before creating it. So instead of that, you may just call ```g.newSerie()``` to either create it or return it, whether it already exists or not.

Let us get back to the example and add the second serie

```
var g = new Graph("example-4") // Creates a new graph

g.resize( 400, 300 );

var jV = g.newSerie( "jV" ) // Note the same of the serie
 .autoAxis()
 .setData( serie1 )
 .setLineColor( 'red' )
 .setLineWidth( 2 )
 .setMarkers({
	strokeWidth: 1,
	strokeColor: 'rgb( 200, 0, 0 )',
	fillColor: 'white'
 });

var pV = g.newSerie( "pV" ) // Note the same of the serie
 .autoAxis()
 .setData( serie2 )
 
g.draw();
```

<div id="example-5" class="jsgraph-example"></div>
<script>

var g = new Graph("example-5") // Creates a new graph

g.resize( 400, 300 ); // Resizes the graph

var jV = g.newSerie( "jV" ) // Note the same of the serie
 .autoAxis()
 .setData( serie1 )
 .setLineColor( 'red' )
 .setLineWidth( 2 )
 .setMarkers({
	strokeWidth: 1,
	strokeColor: 'rgb( 200, 0, 0 )',
	fillColor: 'white'
 });

var pV = g.newSerie( "pV" ) // Note the same of the serie
 .autoAxis()
 .setData( serie2 )

g.getXAxis().setLabel( "Voltage" ).setUnit( "V" );
g.getYAxis().setLabel( "Current density" ).setUnit( "mA cm^-2" );


g.draw();

</script>

However this makes no scientific sense. Power density has not the same units as current density, and hence it should be displayed on the same scale at all ! So instead of calling {@link Serie#autoAxis}, let's rather use another y axis for the power density.


## Plotting on multiple axes


jsGraph can use as many axis as you want. X axes can be at the top or bottom position, and Y axes can be at the left or at the right position. You can specify to jsGraph which axes you want with which options during graph creation ({@link Graph}), but axes can also be created on the fly, which is probably easiers to understand.
For instance, if you call

```
g.getBottomAxis( n[, options ] )
```

where ```n``` is a number, jsGraph will try to fetch the nth bottom axis. If it doesn't find it, a new bottom axis at index ```n``` will be created. You can use the optional parameter ```options``` to specify axis options. However be careful, as **these options will only be effective if no axis existed at this index**.
By default ```g.getXAxis()``` will behave like this:
 1. Look for a bottom axis at index 0
 2. if failed, look for a top axis at index 0
 3. if failed, create a bottom axis at index 0

The index can be changed by using

```
g.getAxis( n ) // n being the index of the axis, starting at 0
```

 See {@link Graph#getXAxis}, {@link Graph#getYAxis}, {@link Graph#getBottomAxis}, {@link Graph#getTopAxis}, {@link Graph#getRightAxis}, {@link Graph#getLeftAxis} for the reference API.

 So let us apply this to the example:

```
var pV = g.newSerie( "pV" ) // Note the name of the serie
 .setXAxis( g.getXAxis() )
 .setYAxis( g.getLeftAxis( 1 ) ) // Use the left axis at index 1
 .setData( serie2 )
```

Here it is the ```1``` that makes all the difference. The first axis was indexed at ```0```, so ```g.getLeftAxis( 1 )``` will actually create a new axis on the left side of the graph (See {@link Graph#getLeftAxis} and related for more details).



<div id="example-6" class="jsgraph-example"></div>
<script>

	var g = new Graph("example-6") // Creates a new graph

	g.resize( 400, 300 ); // Resizes the graph

	var jV = g.newSerie( "jV" ) // Note the same of the serie
	 .autoAxis()
	 .setData( serie1 )
	 .setLineColor( 'red' )
	 .setLineWidth( 2 )
	 .setMarkers({
		strokeWidth: 1,
		strokeColor: 'rgb( 200, 0, 0 )',
		fillColor: 'white'
	 });

	var pV = g.newSerie( "pV" ) // Note the same of the serie
	 .setXAxis( g.getXAxis() )
	 .setYAxis( g.getLeftAxis( 1 ) )
	 .setData( serie2 )

	g.getXAxis().setLabel( "Voltage" ).setUnit( "V" );
	g.getYAxis().setLabel( "Current density" ).setUnit( "mA cm^-2" );

	g.draw();

</script>

Now things are getting really ugly. This is because primary grids and secondary grids exist for all the axes. For the y axis this leads to the superimposition of too many lines. Let's just turn off some of those grids. While we are at it, let's use a right axis for the power density instead of a left axis to clear up some space.

```
pV.setXAxis( g.getXAxis() )
 .setYAxis( g.getRightAxis( ) )
 .setData( serie2 )

g.getXAxis().secondaryGridOff();
g.getYAxis().secondaryGridOff();
g.getRightAxis( ).gridsOff();
g.draw();

```

The whole example (with some cleanup) becomes:

```
var g = new Graph("example-7");

g.resize( 400, 300 );

var jV = g
 .newSerie( "jV", {
 	lineColor: 'red',
 	lineWidth: 2,
 	markers: {
 		strokeWidth: 1,
		strokeColor: 'rgb( 200, 0, 0 )',
		fillColor: 'white'
 	}
 } )
 .autoAxis()
 .setData( serie1 )
 
var pV = g
 .newSerie( "pV" )
 .setXAxis( g.getXAxis() )
 .setYAxis( g.getRightAxis( ) )
 .setData( serie2 );

g
 .getXAxis()
 .setUnit( "V" )
 .setLabel( "Voltage" )
 .secondaryGridOff();

g
 .getLeftAxis()
 .setUnit( "mA cm^-2" )
 .setLabel( "Current density" )
 .secondaryGridOff();

g
 .getRightAxis()
 .setUnit( "mW cm^-2" )
 .setLabel( "Power density" )
 .gridsOff();

g.draw();
```

<div id="example-7" class="jsgraph-example"></div>
<script>

	var g = new Graph("example-7");

	g.resize( 400, 300 );

	var jV = g
	 .newSerie( "jV", {
	 	lineColor: 'red',
	 	lineWidth: 2,
	 	markers: {
	 		strokeWidth: 1,
			strokeColor: 'rgb( 200, 0, 0 )',
			fillColor: 'white'
	 	}
	 } )
	 .autoAxis()
	 .setData( serie1 )
	 
	var pV = g
	 .newSerie( "pV" )
	 .setXAxis( g.getXAxis() )
	 .setYAxis( g.getRightAxis( ) )
	 .setData( serie2 );

	g
	 .getXAxis()
	 .setUnit( "V" )
	 .setLabel( "Voltage" )
	 .secondaryGridOff();

	g
	 .getLeftAxis()
	 .setUnit("mA cm^-2")
	 .setLabel( "Current density" )
	 .secondaryGridOff();

	g
	 .getRightAxis()
	 .setUnit("mW cm^-2")
	 .setLabel( "Power density" )
	 .gridsOff();

	g.draw();

</script>

Good ! Let's now see what we can do with the axes.

## Styling the axis

### Setting axis boundaries

The first thing you will probably want to do is not to rely on the series data to set the axis minimum / maximum.
By default, there is a 10% margin on each side of the serie, so that the serie doesn't directly touch the axis. This can be changed or removed using {@see Axis#setAxisDataSpacing}

```
g
 .getBottomAxis()
 .setAxisDataSpacing( 0, 0.3 ); // 0 margin at the lower part of the axis, 30% at the higher part

g.draw();
```

You can also chose to force the axis boundaries independantly of the data of the series:

```
g
 .getLeftAxis()
 .forceMin( -5 )
 .forceMax( 20 );

 g
 .getRightAxis()
 .forceMax( 0 );

 g.draw();

 ```


<div id="example-8" class="jsgraph-example"></div>
<script>

	var g = new Graph("example-8");

	g.resize( 400, 300 );

	var jV = g
	 .newSerie( "jV", {
	 	lineColor: 'red',
	 	lineWidth: 2,
	 	markers: {
	 		strokeWidth: 1,
			strokeColor: 'rgb( 200, 0, 0 )',
			fillColor: 'white'
	 	}
	 } )
	 .autoAxis()
	 .setData( serie1 )
	 
	var pV = g
	 .newSerie( "pV" )
	 .setXAxis( g.getXAxis() )
	 .setYAxis( g.getRightAxis( ) )
	 .setData( serie2 );

	g
	 .getXAxis()
	 .setUnit( "V" )
	 .setLabel( "Voltage" )
	 .secondaryGridOff();

	g
	 .getLeftAxis()
	 .setUnit("mA cm^-2")
	 .setLabel( "Current density" )
	 .secondaryGridOff()
	 .forceMin( -25 )
 	 .forceMax( 60 );

	g
	 .getRightAxis()
	 .setUnit("mW cm^-2")
	 .setLabel( "Power density" )
	 .gridsOff()
	 .forceMax( 5 );

	g.getBottomAxis().setAxisDataSpacing( 0, 0.3 );

	g.draw();

</script>

### Aligning the axes

Sometimes, if you have two axes that should be aligned on a common value, it would be nice to force the axes to behave accordingly. For example, in our example, it makes sense to align the 0 of the current density with the 0 of the power output. So one of the axis will have to behave differently. Let's pick the power output. A more detailed tutorial {@tutorial adaptto} has been written to detail the behavior of the ```adaptTo``` method.

```
g.getRightAxis().adaptTo( g.getLeftAxis(), 0, 0, "min" ); // The 0 of the right axis should be aligned with the 0 of the left axis
```


<div id="example-9" class="jsgraph-example"></div>
<script>

	var g = new Graph("example-9");

	g.resize( 400, 300 );

	var jV = g
	 .newSerie( "jV", {
	 	lineColor: 'red',
	 	lineWidth: 2,
	 	markers: {
	 		strokeWidth: 1,
			strokeColor: 'rgb( 200, 0, 0 )',
			fillColor: 'white'
	 	}
	 } )
	 .autoAxis()
	 .setData( serie1 )
	 
	var pV = g
	 .newSerie( "pV" )
	 .setXAxis( g.getXAxis() )
	 .setYAxis( g.getRightAxis( ) )
	 .setData( serie2 );

	g
	 .getXAxis()
	 .setUnit( "V" )
	 .setLabel( "Voltage" )
	 .secondaryGridOff();

	g
	 .getLeftAxis()
	 .setUnit("mA cm^-2")
	 .setLabel( "Current density" )
	 .secondaryGridOff()
	 .forceMin( -25 )
 	 .forceMax( 60 );

	g
	 .getRightAxis()
	 .setUnit("mW cm^-2")
	 .setLabel( "Power density" )
	 .gridsOff()
	 .forceMax( 5 );

	g.getBottomAxis().setAxisDataSpacing( 0, 0.3 );
	g.getRightAxis().adaptTo( g.getLeftAxis(), 0, 0, "min" ); // The 0 of the right axis should be aligned with the 0 of the left axis

	g.draw();

</script>

### Coloring the axes

Since v1.13.2, you have the possibility to change the color of the axes. Use the {@link Axis#setAxisColor} method. The color of the ticks can be changed using {@link Axis#setPrimaryTicksColor} and {@link Axis#setSecondaryTicksColor}. The color of the tick labels can be changed using {@link Axis#setTicksLabelColor}. The color of the label can be selected using {@link Axis#setLabelColor}.

```
g
 .getLeftAxis()
 .setAxisColor('red');
 .setPrimaryTicksColor('red')
 .setSecondaryTicksColor('rgba( 150, 10, 10, 0.9 )')
 .setTicksLabelColor('#880000')
 .setLabelColor('red');

```


<div id="example-10" class="jsgraph-example"></div>
<script>

	var g = new Graph("example-10");

	g.resize( 400, 300 );

	var jV = g
	 .newSerie( "jV", {
	 	lineColor: 'red',
	 	lineWidth: 2,
	 	markers: {
	 		strokeWidth: 1,
			strokeColor: 'rgb( 200, 0, 0 )',
			fillColor: 'white'
	 	}
	 } )
	 .autoAxis()
	 .setData( serie1 )
	 
	var pV = g
	 .newSerie( "pV" )
	 .setXAxis( g.getXAxis() )
	 .setYAxis( g.getRightAxis( ) )
	 .setData( serie2 );

	g
	 .getXAxis()
	 .setUnit( "V" )
	 .setLabel( "Voltage" )
	 .secondaryGridOff();

	g
	 .getLeftAxis()
	 .setUnit("mA cm^-2")
	 .setLabel( "Current density" )
	 .secondaryGridOff()
	 .forceMin( -25 )
 	 .forceMax( 60 );

	g
	 .getRightAxis()
	 .setUnit("mW cm^-2")
	 .setLabel( "Power density" )
	 .gridsOff()
	 .forceMax( 5 );

	g.getBottomAxis().setAxisDataSpacing( 0, 0.3 );
	g.getRightAxis().adaptTo( g.getLeftAxis(), 0, 0, "min" ); // The 0 of the right axis should be aligned with the 0 of the left axis

	g
	 .getLeftAxis()
	 .setAxisColor('red')
	 .setPrimaryTicksColor('red')
	 .setSecondaryTicksColor('rgba( 150, 10, 10, 0.9 )')
	 .setTicksLabelColor('#880000')
	 .setLabelColor('red');

	g.draw();

</script>