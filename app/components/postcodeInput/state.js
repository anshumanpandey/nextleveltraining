import { createGlobalState } from 'react-hooks-global-state';
import { GOOGLE_API_KEY } from '../../constants/google';
import { axiosInstance } from '../../api/AxiosBootstrap';

/**
 * @typedef {Object} Coordinate
 * @property {number} lat - The X Coordinate
 * @property {number} lng - The Y Coordinate
 */

const initialState = { isSearching: false };
const { useGlobalState } = createGlobalState(initialState);

export default {
  usePostcodeState: useGlobalState
}

export const usePostCodeSearch = () => {
  const [isSearching, setIsSearching] = useGlobalState("isSearching")

  const generatePlaceDetailUrl = (placeId) => `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=address_component,geometry,formatted_address&key=${GOOGLE_API_KEY}`

  const getPlacePostCode = (details) => details.address_components.find(i => i.types.includes("postal_code"))?.long_name || ""
  const getPlaceState = (details) => details.address_components.find(i => i.types.includes("postal_town"))?.long_name || ""
  const getPlaceCountry = (details) => details.address_components.find(i => i.types.includes("country"))?.long_name || ""
  const getPlaceDistrict = (details) => details.address_components.find(i => i.types.includes("locality"))?.long_name || ""

  const getPlaceCounty = (details) => {
    const county = details.address_components.find(i => i.types.includes("administrative_area_level_2") || i.types.includes("administrative_area_level_1"))
    return county?.long_name || ""
  }
  const getAddress = (details) => details.formatted_address || ""
  /**
   * 
   * @param {*} place Google Place json
   * @returns {Coordinate}
   */
  const getPlaceLatLong = (details) => details.geometry.location

  const getSiteDetails = ({ place_id: placeId }) => {
    const url = generatePlaceDetailUrl(placeId)

    return axiosInstance.get(url)
      .then(({ data }) => ({
        ...data.result,
        getPlacePostCode: () => getPlacePostCode(data.result),
        getPlaceLatLong: () => getPlaceLatLong(data.result),
        getPlaceState: () => getPlaceState(data.result),
        getAddress: () => getAddress(data.result),
        getPlaceCountry: () => getPlaceCountry(data.result),
        getPlaceDistrict: () => getPlaceDistrict(data.result),
        getPlaceCounty: () => getPlaceCounty(data.result)
      }))
  }

  const clear = () => {
    setIsSearching(initialState.isSearching)
  }

  return {
    setIsSearching,
    generatePlaceDetailUrl,
    getSiteDetails,
    getPlacePostCode,
    getPlaceLatLong,
    clearState: clear,
    getAddress,
    isSearching,
  }
}
