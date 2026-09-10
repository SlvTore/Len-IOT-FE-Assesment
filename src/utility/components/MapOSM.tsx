import React, { useEffect, useRef, useState } from 'react';
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import View from 'ol/View';
import Point from 'ol/geom/Point';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import { fromLonLat } from 'ol/proj';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';

interface MapOSMProps {
  markerPosition: [number, number] | null;
}

export default function MapOSM({ markerPosition }: MapOSMProps) {
  const mapElement = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const markerSourceRef = useRef<VectorSource | null>(null);
  const [hasConverted, setHasConverted] = useState(false);

  useEffect(() => {
    if (!mapElement.current) return;

    const markerSource = new VectorSource();

    const markerLayer = new VectorLayer({
      source: markerSource,
      style: new Style({
        image: new CircleStyle({
          radius: 8,
          fill: new Fill({ color: '#ef4444' }),
          stroke: new Stroke({
            color: '#ffffff',
            width: 2,
          }),
        }),
      }),
    });

    const map = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({ source: new OSM() }),
        markerLayer,
      ],
      view: new View({
        center: fromLonLat([118.0149, -2.5489]),
        zoom: 5,
      }),
    });

    mapRef.current = map;
    markerSourceRef.current = markerSource;

    return () => {
      map.setTarget(undefined);
      mapRef.current = null;
      markerSourceRef.current = null;
    };
  }, []);

  useEffect(() => {
    const markerSource = markerSourceRef.current;
    const map = mapRef.current;

    if (!markerSource || !map) return;

    markerSource.clear();

    if (!markerPosition) return;

    const projectedPosition = fromLonLat(markerPosition);

    const marker = new Feature({
      geometry: new Point(projectedPosition),
    });

    markerSource.addFeature(marker);

    map.getView().animate({
      center: projectedPosition,
      zoom: 12,
      duration: 700,
    });
  }, [markerPosition]);

  return (
    <div
      ref={mapElement}
      className="w-full h-[500px] lg:h-[700px] rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
    />
  );
}