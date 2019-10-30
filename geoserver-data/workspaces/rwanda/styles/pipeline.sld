<?xml version="1.0" encoding="UTF-8"?>
<sld:StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:sld="http://www.opengis.net/sld" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" version="1.0.0">
  <NamedLayer>
    <Name>Pipeline</Name>
    <UserStyle>
      <Title>Pipeline</Title>
      <FeatureTypeStyle>
        <Title>Pipeline</Title>
        <Rule>
          <Title>Pipeline</Title>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#0000ff</CssParameter>
              <CssParameter name="stroke-linecap">square</CssParameter>
              <CssParameter name="stroke-linejoin">bevel</CssParameter>
            </Stroke>
          </LineSymbolizer>
          <TextSymbolizer>
            <Label>
              <ogc:PropertyName>Size</ogc:PropertyName>
              <ogc:PropertyName>Material</ogc:PropertyName>
              <ogc:PropertyName>Pressure</ogc:PropertyName>
            </Label>
            <LabelPlacement>
              <LinePlacement>
                <PerpendicularOffset>
                  10
                </PerpendicularOffset>
              </LinePlacement>
            </LabelPlacement>
            <Fill>
              <CssParameter name="fill">#000000</CssParameter>
            </Fill>
            <Halo>
              <Radius>3</Radius>
              <Fill>
                <CssParameter name="fill">#FFFFFF</CssParameter>
              </Fill>
            </Halo>
            <Font>
              <CssParameter name="font-family">Arial</CssParameter>
              <CssParameter name="font-size">14</CssParameter>
              <CssParameter name="font-style">normal</CssParameter>
              <CssParameter name="font-weight">bold</CssParameter>
            </Font>
            <VendorOption name="labelAllGroup">true</VendorOption>
            <VendorOption name="followLine">true</VendorOption>
          </TextSymbolizer>
        </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</sld:StyledLayerDescriptor>