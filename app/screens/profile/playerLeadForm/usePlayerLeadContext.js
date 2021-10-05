import { useFormikContext } from 'formik';

const usePlayerLeadContext = () => {

  const formikContext = useFormikContext();

  const goToNextStep = () => {
    formikContext.setFieldValue("currentStep", formikContext.values.currentStep + 1)
  }

  const goToPevStep = () => {
    const prev = formikContext.values.currentStep - 1
    if (prev >= 0) {
      formikContext.setFieldValue("currentStep", prev)
    }
  }

  return {
    ...formikContext,
    goToNextStep,
    goToPevStep
  };

};


export default usePlayerLeadContext;