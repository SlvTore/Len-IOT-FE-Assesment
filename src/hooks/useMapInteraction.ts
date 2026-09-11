import { useEffect, type MutableRefObject } from 'react';
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import { fromLonLat } from 'ol/proj';

export function useMapInteraction(
  mapRef: MutableRefObject<Map | null>,
  markerSourceRef: MutableRefObject<VectorSource | null>,
  markerPosition: [number, number] | null,
  isMapReady: boolean
) {
  useEffect(() => {
    const map = mapRef.current;
    const source = markerSourceRef.current;

    if (!isMapReady || !map || !source || !markerPosition) {
      return;
    }

    const projectedPosition = fromLonLat(markerPosition);

    const marker = new Feature({
      geometry: new Point(projectedPosition),
    });

    source.clear();
    source.addFeature(marker);

    source.changed();
    map.renderSync();

    map.getView().animate({
      center: projectedPosition,
      zoom: 12,
      duration: 700,
    });
  }, [isMapReady, markerPosition, mapRef, markerSourceRef]);
}
