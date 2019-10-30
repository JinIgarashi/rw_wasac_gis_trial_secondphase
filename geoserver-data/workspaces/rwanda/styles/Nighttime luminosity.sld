<?xml version="1.0" encoding="ISO-8859-1"?>
<StyledLayerDescriptor version="1.0.0"
                       xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd"
                       xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc"
                       xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <NamedLayer>
    <Name>Nighttime luminosity</Name>
    <UserStyle>
      <Name>tmp</Name>
      <FeatureTypeStyle>
        <Title>Nighttime luminosity</Title>
        <Rule>
          <Title>0 to 100</Title>
          <ogc:Filter>
            <And>
              <ogc:PropertyIsGreaterThanOrEqualTo>
                <ogc:PropertyName>light_int</ogc:PropertyName>
                <ogc:Literal>0</ogc:Literal>
              </ogc:PropertyIsGreaterThanOrEqualTo>
              <ogc:PropertyIsLessThan>
                <ogc:PropertyName>light_int</ogc:PropertyName>
                <ogc:Literal>100</ogc:Literal>
              </ogc:PropertyIsLessThan>
            </And>
          </ogc:Filter>
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#000000</CssParameter>
              <CssParameter name="fill-opacity">1.00</CssParameter>
            </Fill>
            <Stroke>
              <CssParameter name="stroke-width">0.100000</CssParameter>
            </Stroke>
          </PolygonSymbolizer>
        </Rule>

        <Rule>
          <Title>100 to 200</Title>
          <ogc:Filter>
            <And>
              <ogc:PropertyIsGreaterThanOrEqualTo>
                <ogc:PropertyName>light_int</ogc:PropertyName>
                <ogc:Literal>100</ogc:Literal>
              </ogc:PropertyIsGreaterThanOrEqualTo>
              <ogc:PropertyIsLessThan>
                <ogc:PropertyName>light_int</ogc:PropertyName>
                <ogc:Literal>200</ogc:Literal>
              </ogc:PropertyIsLessThan>
            </And>
          </ogc:Filter>
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#999900</CssParameter>
              <CssParameter name="fill-opacity">1.00</CssParameter>
            </Fill>
            <Stroke>
              <CssParameter name="stroke-width">0.100000</CssParameter>
            </Stroke>
          </PolygonSymbolizer>
        </Rule>

        <Rule>
          <Title>200 to 250</Title>
          <ogc:Filter>
            <And>
              <ogc:PropertyIsGreaterThanOrEqualTo>
                <ogc:PropertyName>light_int</ogc:PropertyName>
                <ogc:Literal>200</ogc:Literal>
              </ogc:PropertyIsGreaterThanOrEqualTo>
              <ogc:PropertyIsLessThan>
                <ogc:PropertyName>light_int</ogc:PropertyName>
                <ogc:Literal>250</ogc:Literal>
              </ogc:PropertyIsLessThan>
            </And>
          </ogc:Filter>
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#cccc00</CssParameter>
              <CssParameter name="fill-opacity">1.00</CssParameter>
            </Fill>
            <Stroke>
              <CssParameter name="stroke-width">0.100000</CssParameter>
            </Stroke>
          </PolygonSymbolizer>
        </Rule>

        <Rule>
          <Title>250 to 255</Title>
          <ogc:Filter>
            <And>
              <ogc:PropertyIsGreaterThanOrEqualTo>
                <ogc:PropertyName>light_int</ogc:PropertyName>
                <ogc:Literal>250</ogc:Literal>
              </ogc:PropertyIsGreaterThanOrEqualTo>
              <ogc:PropertyIsLessThanOrEqualTo>
                <ogc:PropertyName>light_int</ogc:PropertyName>
                <ogc:Literal>255</ogc:Literal>
              </ogc:PropertyIsLessThanOrEqualTo>
            </And>
          </ogc:Filter>
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#ffff00</CssParameter>
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