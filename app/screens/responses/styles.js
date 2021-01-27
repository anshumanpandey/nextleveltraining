import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F8F8FA'},
  listHeaderStatus: {
    paddingLeft: 20,
    backgroundColor: 'white',
  },
  totalShowing: {
    color: '#80849D',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 10,
  },
  lastUpdated: {
    color: '#80849D',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 5,
    marginBottom: 10,
  },
  responseItem: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
  },
  responseName: {
    fontWeight: '700',
    fontSize: 17,
    marginBottom: 6,
  },
  responseDetail: {
    fontWeight: '500',
    fontSize: 15,
    marginBottom: 6,
  },
  locationIcon: {fontSize: 15, color: '#80849D', marginTop: 2},
  locationText: {
    color: '#80849D',
    fontSize: 15,
    fontWeight: '500',
    paddingLeft: 5,
  },
});

export default styles;
