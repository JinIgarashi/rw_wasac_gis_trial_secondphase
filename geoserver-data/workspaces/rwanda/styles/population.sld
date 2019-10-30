<?xml version="1.0" encoding="ISO-8859-1"?>
<StyledLayerDescriptor version="1.0.0"
                       xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd"
                       xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc"
                       xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <NamedLayer>
    <Name>population</Name>
    <UserStyle>
      <Name>tmp</Name>
      <FeatureTypeStyle>
        <Title>Population</Title>
        <Rule>
          <Title>0 to 100</Title>
          <ogc:Filter>
            <And>
              <ogc:PropertyIsGreaterThanOrEqualTo>
                <ogc:PropertyName>population</ogc:PropertyName>
                <ogc:Literal>0</ogc:Literal>
              </ogc:PropertyIsGreaterThanOrEqualTo>
              <ogc:PropertyIsLessThan>
                <ogc:PropertyName>population</ogc:PropertyName>
                <ogc:Literal>100</ogc:Literal>
              </ogc:PropertyIsLessThan>
            </And>
          </ogc:Filter>
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#FFFFFF</CssParameter>
              <CssParameter name="fill-opacity">1.00</CssParameter>
            </Fill>
            <Stroke>
              <CssParameter name="stroke-width">0.100000</CssParameter>
            </Stroke>
          </PolygonSymbolizer>
        </Rule>

        <Rule>
          <Title>100 to 500</Title>
          <ogc:Filter>
            <And>
              <ogc:PropertyIsGreaterThanOrEqualTo>
                <ogc:PropertyName>population</ogc:PropertyName>
                <ogc:Literal>100</ogc:Literal>
              </ogc:PropertyIsGreaterThanOrEqualTo>
              <ogc:PropertyIsLessThan>
                <ogc:PropertyName>population</ogc:PropertyName>
                <ogc:Literal>500</ogc:Literal>
              </ogc:PropertyIsLessThan>
            </And>
          </ogc:Filter>
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#ffe3e3</CssParameter>
              <CssParameter name="fill-opacity">1.00</CssParameter>
            </Fill>
            <Stroke>
              <CssParameter name="stroke-width">0.100000</CssParameter>
            </Stroke>
          </PolygonSymbolizer>
        </Rule>

        <Rule>
          <Title>500 to 1000</Title>
          <ogc:Filter>
            <And>
              <ogc:PropertyIsGreaterThanOrEqualTo>
                <ogc:PropertyName>population</ogc:PropertyName>
                <ogc:Literal>500</ogc:Literal>
              </ogc:PropertyIsGreaterThanOrEqualTo>
              <ogc:PropertyIsLessThan>
                <ogc:PropertyName>population</ogc:PropertyName>
                <ogc:Literal>1000</ogc:Literal>
              </ogc:PropertyIsLessThan>
            </And>
          </ogc:Filter>
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#ffc7c7</CssParameter>
              <CssParameter name="fill-opacity">1.00</CssParameter>
            </Fill>
            <Stroke>
              <CssParameter name="stroke-width">0.100000</CssParameter>
            </Stroke>
          </PolygonSymbolizer>
        </Rule>

        <Rule>
          <Title>1000 to 2500</Title>
          <ogc:Filter>
            <And>
              <ogc:PropertyIsGreaterThanOrEqualTo>
                <ogc:PropertyName>population</ogc:PropertyName>
                <ogc:Literal>1000</ogc:Literal>
              </ogc:PropertyIsGreaterThanOrEqualTo>
              <ogc:PropertyIsLessThanOrEqualTo>
                <ogc:PropertyName>population</ogc:PropertyName>
                <ogc:Literal>2500</ogc:Literal>
              </ogc:PropertyIsLessThanOrEqualTo>
            </And>
          </ogc:Filter>
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#ffaaaa</CssParameter>
              <CssParameter name="fill-opacity">1.00</CssParameter>
            </Fill>
            <Stroke>
              <CssParameter name="stroke-width">0.100000</CssParameter>
            </Stroke>
          </PolygonSymbolizer>
        </Rule>

        <Rule>
          <Title>2500 to 5000</Title>
          <ogc:Filter>
            <And>
              <ogc:PropertyIsGreaterThanOrEqualTo>
                <ogc:PropertyName>population</ogc:PropertyName>
                <ogc:Literal>2500</ogc:Literal>
              </ogc:PropertyIsGreaterThanOrEqualTo>
              <ogc:PropertyIsLessThanOrEqualTo>
                <ogc:PropertyName>population</ogc:PropertyName>
                <ogc:Literal>5000</ogc:Literal>
              </ogc:PropertyIsLessThanOrEqualTo>
            </And>
          </ogc:Filter>
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#ff8e8e</CssParameter>
              <CssParameter name="fill-opacity">1.00</CssParameter>
            </Fill>
            <Stroke>
              <CssParameter name="stroke-width">0.100000</CssParameter>
            </Stroke>
          </PolygonSymbolizer>
        </Rule>
        
        <Rule>
          <Title>5000 to 7500</Title>
          <ogc:Filter>
            <And>
              <ogc:PropertyIsGreaterThanOrEqualTo>
                <ogc:PropertyName>population</ogc:PropertyName>
                <ogc:Literal>5000</ogc:Literal>
              </ogc:PropertyIsGreaterThanOrEqualTo>
              <ogc:PropertyIsLessThanOrEqualTo>
                <ogc:PropertyName>population</ogc:PropertyName>
                <ogc:Literal>7500</ogc:Literal>
              </ogc:PropertyIsLessThanOrEqualTo>
            </And>
          </ogc:Filter>
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#ff7171</CssParameter>
              <CssParameter name="fill-opacity">1.00</CssParameter>
            </Fill>
            <Stroke>
              <CssParameter name="stroke-width">0.100000</CssParameter>
            </Stroke>
          </PolygonSymbolizer>
        </Rule>
        
        <Rule>
          <Title>7500 to 10000</Title>
          <ogc:Filter>
            <And>
              <ogc:PropertyIsGreaterThanOrEqualTo>
                <ogc:PropertyName>population</ogc:PropertyName>
                <ogc:Literal>7500</ogc:Literal>
              </ogc:PropertyIsGreaterThanOrEqualTo>
              <ogc:PropertyIsLessThanOrEqualTo>
                <ogc:PropertyName>population</ogc:PropertyName>
                <ogc:Literal>10000</ogc:Literal>
              </ogc:PropertyIsLessThanOrEqualTo>
            </And>
          </ogc:Filter>
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#ff5555</CssParameter>
              <CssParameter name="fill-opacity">1.00</CssParameter>
            </Fill>
            <Stroke>
              <CssParameter name="stroke-width">0.100000</CssParameter>
            </Stroke>
          </PolygonSymbolizer>
        </Rule>
        
        <Rule>
          <Title>10000 to 12500</Title>
          <ogc:Filter>
            <And>
              <ogc:PropertyIsGreaterThanOrEqualTo>
                <ogc:PropertyName>population</ogc:PropertyName>
                <ogc:Literal>10000</ogc:Literal>
              </ogc:PropertyIsGreaterThanOrEqualTo>
              <ogc:PropertyIsLessThanOrEqualTo>
                <ogc:PropertyName>population</ogc:PropertyName>
                <ogc:Literal>12500</ogc:Literal>
              </ogc:PropertyIsLessThanOrEqualTo>
            </And>
          </ogc:Filter>
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#ff3838</CssParameter>
              <CssParameter name="fill-opacity">1.00</CssParameter>
            </Fill>
            <Stroke>
              <CssParameter name="stroke-width">0.100000</CssParameter>
            </Stroke>
          </PolygonSymbolizer>
        </Rule>
        
        <Rule>
          <Title>12500 to 15000</Title>
          <ogc:Filter>
            <And>
              <ogc:PropertyIsGreaterThanOrEqualTo>
                <ogc:PropertyName>population</ogc:PropertyName>
                <ogc:Literal>12500</ogc:Literal>
              </ogc:PropertyIsGreaterThanOrEqualTo>
              <ogc:PropertyIsLessThanOrEqualTo>
                <ogc:PropertyName>population</ogc:PropertyName>
                <ogc:Literal>15000</ogc:Literal>
              </ogc:PropertyIsLessThanOrEqualTo>
            </And>
          </ogc:Filter>
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#ff1c1c</CssParameter>
              <CssParameter name="fill-opacity">1.00</CssParameter>
            </Fill>
            <Stroke>
              <CssParameter name="stroke-width">0.100000</CssParameter>
            </Stroke>
          </PolygonSymbolizer>
        </Rule>
        
        <Rule>
          <Title>15000 to</Title>
          <ogc:Filter>
              <ogc:PropertyIsGreaterThanOrEqualTo>
                <ogc:PropertyName>population</ogc:PropertyName>
                <ogc:Literal>15000</ogc:Literal>
              </ogc:PropertyIsGreaterThanOrEqualTo>
          </ogc:Filter>
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#ff0000</CssParameter>
              <CssParameter name="fill-opacity">1.00</CssParameter>
            </Fill>
            <Stroke>
              <CssParameter name="stroke-width">0.100000</CssParameter>
            </Stroke>
          </PolygonSymbolizer>
        </Rule>
        
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>