/**
 * @file MapComponent.test.tsx
 * @description Component tests for the OpenLayers map wrapper.
 * @module MapComponentTests
 */
import { render } from '@testing-library/react';
import MapComponent from '../Map/MapComponent';

const mockMapMethods = {
  setTarget: jest.fn(),
  on: jest.fn(),
  un: jest.fn(),
  forEachFeatureAtPixel: jest.fn(),
};
const mockSourceMethods = { clear: jest.fn(), addFeature: jest.fn() };

jest.mock('ol/Map', () => ({
  __esModule: true,
  default: class MockMap {
    setTarget = mockMapMethods.setTarget;
    on = mockMapMethods.on;
    un = mockMapMethods.un;
    forEachFeatureAtPixel = mockMapMethods.forEachFeatureAtPixel;
    getView = jest.fn(() => ({ animate: jest.fn() }));
  },
}));
jest.mock('ol/View', () => ({ __esModule: true, default: jest.fn() }));
jest.mock('ol/layer/Tile', () => ({ __esModule: true, default: jest.fn() }));
jest.mock('ol/layer/Vector', () => ({ __esModule: true, default: jest.fn() }));
jest.mock('ol/source/OSM', () => ({ __esModule: true, default: jest.fn() }));
jest.mock('ol/source/Vector', () => ({
  __esModule: true,
  default: class MockVectorSource {
    clear = mockSourceMethods.clear;
    addFeature = mockSourceMethods.addFeature;
  },
}));
jest.mock('ol/Feature', () => ({ __esModule: true, default: jest.fn() }));
jest.mock('ol/geom/Point', () => ({ __esModule: true, default: jest.fn() }));
jest.mock('ol/proj', () => ({
  fromLonLat: jest.fn((coordinate) => coordinate),
  toLonLat: jest.fn(() => [106.816666, -6.2]),
}));
jest.mock('ol/style', () => ({ Circle: jest.fn(), Fill: jest.fn(), Stroke: jest.fn(), Style: jest.fn() }));

describe('MapComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders a map container and initializes OpenLayers', () => {
    const { container } = render(<MapComponent markerPosition={null} />);
    expect(container.firstChild).toHaveClass('h-[500px]');
    expect(mockMapMethods.setTarget).not.toHaveBeenCalled();
  });

  test('cleans up the map target when unmounted', () => {
    const { unmount } = render(<MapComponent markerPosition={null} />);
    unmount();
    expect(mockMapMethods.setTarget).toHaveBeenCalledWith(undefined);
    expect(mockMapMethods.un).toHaveBeenCalledWith('singleclick', expect.any(Function));
  });

  test('adds a marker and animates to a new position', () => {
    render(<MapComponent markerPosition={[106.816666, -6.2]} />);
    expect(mockSourceMethods.clear).toHaveBeenCalled();
    expect(mockSourceMethods.addFeature).toHaveBeenCalledTimes(1);
  });

  test('sends the selected marker coordinate to the callback', () => {
    const onMarkerClick = jest.fn();
    mockMapMethods.forEachFeatureAtPixel.mockReturnValue({});
    render(<MapComponent markerPosition={[106.816666, -6.2]} onMarkerClick={onMarkerClick} />);

    const clickHandler = mockMapMethods.on.mock.calls.at(-1)?.[1];
    clickHandler({ pixel: [10, 20], coordinate: [106.816666, -6.2] });

    expect(onMarkerClick).toHaveBeenCalledWith([106.816666, -6.2]);
  });
});
