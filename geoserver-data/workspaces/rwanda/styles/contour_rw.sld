<?xml version="1.0" encoding="UTF-8"?>
<sld:StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:sld="http://www.opengis.net/sld" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" version="1.0.0">
  <NamedLayer>
    <Name>Contours</Name>
    <UserStyle>
      <Title>Contours</Title>
      <FeatureTypeStyle>
        <Title>Contours</Title>
        <Rule>
          <Title>Contours</Title>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#c0c0c0</CssParameter>
              <CssParameter name="stroke-linecap">square</CssParameter>
              <CssParameter name="stroke-linejoin">bevel</CssParameter>
            </Stroke>
          </LineSymbolizer>
          <TextSymbolizer>
            <Label>
              <ogc:PropertyName>contour</ogc:PropertyName>
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
              <CssParameter name="radius">2</CssParameter>
            </Halo>
            <Font>
              <CssParameter name="font-family">Arial</CssParameter>
              <CssParameter name="font-size">12</CssParameter>
              <CssParameter name="font-style">normal</CssParameter>
            </Font>
            <VendorOption name="labelAllGroup">true</VendorOption>
            <VendorOption name="followLine">true</VendorOption>
          </TextSymbolizer>
        </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</sld:StyledLayerDescriptor>