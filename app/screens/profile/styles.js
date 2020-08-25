import Dimension from '../../constants/dimensions';
import Colors from '../../constants/color';

const styles = {
  container: {},
  userView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingBottom: 20,
  },
  userImg: {
    height: Dimension.px100,
    width: Dimension.px100,
    borderRadius: Dimension.px100 / 2,
  },
  editView: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: Dimension.px30,
    height: Dimension.px30,
    backgroundColor: Colors.s_blue,
    borderRadius: Dimension.px30 / 2,
    right: 0,
    top: 3,
  },
  cardContainer: {
    backgroundColor: 'white',
    padding: Dimension.px10,
    marginTop: 12,
  },
  titleText: {
    fontSize: 16,
    color: Colors.s_blue,
  },
  headText: {
    fontSize: 16,
    color: Colors.s_blue,
  },
  dataText: {
    fontSize: 12,
    color: 'gray',
  },
  checkText: {
    fontSize: 16,
    color: 'gray',
  },
  arrdataText: {
    fontWeight: 'bold',
    paddingBottom: 4,
    fontSize: 12,
    color: 'gray',
  },
  inputContain: {
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  cardContain: {
    borderBottomColor: 'lightgray',
    borderBottomWidth: 0.5,
    paddingBottom: 12,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  timePeriod: {fontWeight: 'bold', color: 'gray', marginTop: 15, fontSize: 15},
  dateText: {color: 'gray', fontSize: 15},
  pickerView: {
    flexDirection: 'row',
    width: Dimension.pro100,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Dimension.px20,
  },
  dateView: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    width: Dimension.pro40,
    paddingVertical: Dimension.px10,
  },
  checkIcon: {fontSize: 22, color: 'gray', marginRight: 7},
  checkView: {marginTop: 20, flexDirection: 'row', alignItems: 'center'},
  dateInputs: {
    dateInput: {
      borderBottomWidth: 1,
      borderBottomColor: 'lightgray',
      borderWidth: 0,
      margin: 0,
      padding: 0,
      alignItems: 'flex-start',
      color: 'black',
    },
    dateText: {
      fontSize: 17,
      margin: 0,
      padding: 0,
      color: 'black',
    },
    placeholderText: {
      fontSize: 17,
      margin: 0,
      padding: 0,
    },
    datePickerCon: {
      color: 'black',
    }
  },
};

export default styles;
