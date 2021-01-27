import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F8F8FA'},
  listHeaderPref: {
    paddingLeft: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  prefText: {
    color: '#80849D',
    fontSize: 16,
    fontWeight: '500',
  },
  prefLink: {
    fontSize: 16,
    fontWeight: '500',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
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
  leadItem: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
  },
  leadName: {
    fontWeight: '700',
    fontSize: 17,
    marginBottom: 6,
  },
  leadDetail: {
    fontWeight: '500',
    fontSize: 15,
    marginBottom: 6,
  },
  leadIndicator: {
    fontSize: 20,
    fontWeight: '700',
    color: '#327DED',
    left: 5,
    top: 12,
    position: 'absolute',
  },
  locationIcon: {fontSize: 15, color: '#80849D', marginTop: 2},
  locationText: {
    color: '#80849D',
    fontSize: 15,
    fontWeight: '500',
    paddingHorizontal: 5,
  },
  creditText: {
    color: '#80849D',
    fontSize: 15,
    fontWeight: '500',
  },
  quoteTag: {
    marginTop: 10,
    backgroundColor: '#ECF7F5',
    height: 40,
    width: '80%',
    borderRadius: 5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
