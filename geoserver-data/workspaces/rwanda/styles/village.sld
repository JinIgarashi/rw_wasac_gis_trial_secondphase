<?xml version="1.0" encoding="UTF-8"?><sld:StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:sld="http://www.opengis.net/sld" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" version="1.0.0">
  <sld:NamedLayer>
    <sld:Name>tmp</sld:Name>
    <sld:UserStyle>
      <sld:Name>tmp</sld:Name>
      <sld:FeatureTypeStyle>
        <sld:Name>name</sld:Name>
        <sld:Rule>
          <sld:Name>Single symbol</sld:Name>
          <sld:PolygonSymbolizer>
            <sld:Fill>
              <sld:CssParameter name="fill">#952c37</sld:CssParameter>
              <sld:CssParameter name="fill-opacity">0.00</sld:CssParameter>
            </sld:Fill>
            <sld:Stroke>
              <sld:CssParameter name="stroke-linejoin">bevel</sld:CssParameter>
              <sld:CssParameter name="stroke-dasharray">2.0 4.0</sld:CssParameter>
              <sld:CssParameter name="stroke-width">0.100000</sld:CssParameter>
            </sld:Stroke>
          </sld:PolygonSymbolizer>
           <TextSymbolizer>
          <Label>
            <ogc:PropertyName>village</ogc:PropertyName>
          </Label>
          <LabelPlacement>
            <LinePlacement />
          </LabelPlacement>
          <Fill>
            <CssParameter name="fill">#000000</CssParameter>
          </Fill>
          <Halo>
            <CssParameter name="radius">2</CssParameter>
          </Halo>
          <Font>
            <CssParameter name="font-family">Arial</CssParameter>
            <CssParameter name="font-size">9</CssParameter>
            <CssParameter name="font-style">normal</CssParameter>
          </Font>
          <Geometry>
            <ogc:Function name="centroid">
              <ogc:PropertyName>geom</ogc:PropertyName>
            </ogc:Function>
          </Geometry>
        </TextSymbolizer>
        </sld:Rule>
      </sld:FeatureTypeStyle>
    </sld:UserStyle>
  </sld:NamedLayer>
</sld:StyledLayerDescriptor>