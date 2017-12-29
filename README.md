# ecologicalprice
## global
### sources
quantity | value | source
---|---|---
World total consumption (2013) | 20.6 B gha / year | ecological footprint network
World total biocapacity (2013) | 12.3 B gha / year | ecological footprint network
World GDP (2013) | 75,600 B$ | Wikipedia
### results
We compute the price of one gha for one year by equating the world total biocapacity and the world GDP:
```
1 gha <-> (75,600*10⁹ $)/(12.3*10⁹ gha) <-> $6,150
```
The ecological price of one global hectare for one year is $6,150.

## carbon
### sources
#### Footprint of CO2 emissions
quantity|value|source
---|---|---
Footprint of CO2 emissions|0.256 gha / year / ton|ecological footprint network
#### Emissions for several human activities

Activity|CO2 emissions|source
---|---|---
Paris to New York round trip|1.3t|various (see below)
One kilometer on an average car (not including building the car)|650g|https://www.epa.gov/

Note: depending on sources, CO2 emissions range anywhere from 0.6 tons (https://www.icao.int) to 1.6 tons (http://climatecare.org/calculator/) and even to more than 2 tons (https://co2.myclimate.org/). 1.3 seemed to be around the middle of the range.

### results
#### ecological price of a ton of CO2
We compute the price of one ton of CO2 by multiplying the footprint of one ton of CO2 by the ecological price of a global hectare:
```
0.256 * $6,150 = $1570
```
#### Ecological for various human activities

Activity|CO2 emissions|ecological price
---|---|---
Paris to New York round trip|1.3t|1.3 * 1570 = $2040
1000 km by car|0.650t|0.65 * 1570 = $1020
10 km by car|0.06t|0.06 * 1570 = $10

## Crop products
### Sources
#### Formula for computing ecological footprint and price
To compute the ecological price of a kilogram of a given agricultural product, we multiply the ecological footprint by the ecological price of a global hectare. The ecological footprint of a kilogram of a given product depends on the yield of this product as per the following formula:
```
ecological_footprint = product_quantity / yield / crop_intensity * 2.56
```
Where 2.56 is the equivalent factor for crop hectares (some types of terrain count more than the others)
##### yields for some agricultural products
source: http://www.fao.org/faostat/en/#data/QC

Product|Yield
---|---
Apples|16 t/ha
TODO: We must include the ecological price of the transportation.
### Results
if there is just one crop per year for the given product, the formula above becomes:
```
ecological_price = product_quantity (tons) / yield * 2.56 * $6,150
ecological_price = product_quantity (tons) / yield * 15,700
```

Product|Ecological price
---|---
Apples (1kg)|0.001 / 16 * 15,700 = $0.98

## Livestock
### Sources
Livestock computations are more complicated because they are derived from livestock feeds, which themselves in turn have specific ecological footprints.
Recompute them from raw data remains to be done, but the ecological footprint network computed ecological footprint for cattle and chicken:

Product|Total produced (2013)|Total ecological footprint (2013)
---|---|---
Cattle|328,000 t|1,035,000 gha
Chicken|59,700 t|117,500 gha
### Results
We can then compute the ecological price of 1 kg of each product by computing the ecological footprint of 1 kg in gha and then multiply by the ecological price of one gha:

Product|Ecological price
---|---
Cattle (1kg)|1,035,000 / 1,000 / 328,000 * 6,150 = $20
Chicken (1kg)|117,500 / 1,000 / 59,700 * 6,150 = $12.1
