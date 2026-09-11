import React, { useEffect, useRef, useState } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { useMapInteraction } from '../../hooks/useMapInteraction';

interface MapComponentProps {
  markerPosition: [number, number] | null;
  onMarkerClick?: (position: [number, number]) => void;
  onMapClick?: (position: [number, number]) => void;
}

export default function MapComponent({
  markerPosition,
  onMarkerClick,
  onMapClick,
}: MapComponentProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const sourceRef = useRef<VectorSource | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const markerClickRef = useRef(onMarkerClick);
  const mapClickRef = useRef(onMapClick);

  markerClickRef.current = onMarkerClick;
  mapClickRef.current = onMapClick;

  useMapInteraction(mapRef, sourceRef, markerPosition, isMapReady);

  useEffect(() => {
    if (!elementRef.current) return;

    const source = new VectorSource();
    const map = new Map({
      target: elementRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source,
          style: new Style({
            image: new CircleStyle({
              radius: 10,
              fill: new Fill({
                color: '#ef4444',
              }),
              stroke: new Stroke({
                color: '#ffffff',
                width: 3,
              }),
            }),
          }),
        }),
      ],
      view: new View({ center: fromLonLat([118.0149, -2.5489]), zoom: 5 }),
    });
    mapRef.current = map;
    sourceRef.current = source;
    setIsMapReady(true);

    const handleMapClick = (event: any) => {
      const coordinate = (toLonLat(event.coordinate) ??
        event.coordinate) as [number, number];

      const feature = map.forEachFeatureAtPixel(
        event.pixel,
        (candidateFeature) => candidateFeature
      );

      if (feature) {
        markerClickRef.current?.(coordinate);
        return;
      }

      mapClickRef.current?.(coordinate);
    };

    map.on('singleclick', handleMapClick);

    return () => {
      map.un('singleclick', handleMapClick);
      map.setTarget(undefined);
      mapRef.current = null;
      sourceRef.current = null;
      setIsMapReady(false);
    };
  }, []);

  return <div ref={elementRef} className="h-[500px] w-full overflow-hidden rounded-xl border border-slate-200 shadow-lg lg:h-[700px]" />;
}
