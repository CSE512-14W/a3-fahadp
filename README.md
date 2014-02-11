Evaluating Benin Refrigerator Equipment
==================

Data Domain

My data is Benin's cold chain equipment inventory data. It consists of all the refrigerators stationed at different health posts for storage of vaccines. This is collected via survey forms by Ministry of Health. Permission to use the cold chain national data of Benin was taken from them for a class project. This data is not complete and has errors.

The purpose of this data collection is to evaluate the cold chain infrastructure before sending out vaccines. Vaccines need to be maintained at proper temperature otherwise they expired. This ends in wastage of vaccine, worth millions of dollars, or worse expired vaccines are given out to pateints.

This data is coming from a system called CCEM (Cold Chain Equipment Management) access based tool used by several countries, which was built in collaboration between University of Washington and PATH. I exported the data from CCEM into excel files and then converted the relevant data to json.

Story Board

To start with, lets talk about the objective of the visualization. This data is being collected to evaluate the infrastructure and take proper decisions for future. Now I can make a visualization that shows a report or the specifics policy maker want to see but they need to explore the data themselves.

Evaluating an infrastructure is very generic and has many perspectives in it. So I started looking at the communication we are having with different NGOs and Ministry of Health people. They have discussed various requirements or benefits they expect from cold chain information system. They were as follow:
-	Budget required for next 5 years to maintain cold chain infrastructure
-	Evaluate the supply demand of vaccines
-	Evaluate the required refrigerator capacity for health centers
-	Evaluate current equipment status

I found evaluating current equipment status very interesting, as that is needed before any other evaluation. Focusing on the equipment status, I found following three features of refrigerator that cold chain experts want to see at first:
-	Equipment Age
-	Equipment Source of Power
-	Equipment functionality status

Equipment age is looked at so they can replace the old refrigerators with new ones. Second, countries are trying to get rid of Kerosene and Gas powered refrigerators, as these are more inconvenient and limited power sources. On top of that, the policy makers want to look at the functional vs non-functional refrigerators so processes for repairing of the equipment could be fixed.

Since this is not a time series data so instead of line chart, bar chart makes more sense. So I visualize following chart with functional and non-functional as part of the stacked chart.

 

This is good to view the functional status of refrigerators along with power supply and age but it is hard to view the overall functional refrigerator. So I came up with a separate bar chart graph for functional status and make them interact in a sense that if I select a subsection of one bar chart, other bar charts rearrange themselves to show the corresponding data for other parameters of the equipment. That way, I can see what the age distribution looks like for functional refrigerators and what the common power source or vice versa.

 

Well this looks good and I can focus on certain values of one parameter and see how that effects the distribution of other parameters. Nonetheless, to be effective, I need to show that which locations we are talking about in this. Since there are a lot of health facilities, so putting their names in a list would not make sense and would be hard to interpret. The best way to do that is show that on a map. I changed my sketch to this.

 


Final Implementation:


In this interactive visualization, one can select an area of any bar chart to refine the data. The other two bar charts will show the cumulative numbers of equipment that is currently selected due the selection. The graphs are normalized, according to the highest value, so you can see the distribution of the data in each bar chart. Along with the changes in bar charts, you will see the changes in the markers on the maps too. This shows locations of the selected refrigerators. If no selection is made, map will show all equipment's location. Once a selection is made, one can reset the selection by using reset link that appear on the top-right corner of the chart. One can also slide the selection or resize the selection.

Once you start looking at the data, you find several interesting aspects of the data. 

Majority of Electric refrigerators are below 10 years of age while dual powered refrigerators (electic-kerosene and electic-gas) are more in range of 10 to 15 years old. So if you get rid of these dual powered refrigerators, you will be getting rid of old equipment that, most probably, already needs replacement.

Kerosene powered refrigerators are more in southern part of Benin. More functional electric refrigerators, that are at most 5 years old, are in southern part of Benin.


Library/3rd Party Code Used:

- D3
- Crossfilter
- Crossfilter example with Google Maps (https://github.com/brendankenny/crossfilter-and-v3)




