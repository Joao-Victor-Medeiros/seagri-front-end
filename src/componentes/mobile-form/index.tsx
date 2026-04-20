import { PersonalInfoSection } from "@/componentes/mobile-form/sections/personal-info";
import { ProductionProfileSection } from "@/componentes/mobile-form/sections/production-profile";
import { LocationInfoSection } from "@/componentes/mobile-form/sections/location-info";
import { StepHeader } from "@/componentes/mobile-form/step-header";
import { StepNavigation } from "@/componentes/mobile-form/step-navigation";
import { useFarmerForm } from "@/hooks/form/use-farmer-form";
import styles from "./mobile-form.module.css";

export const MobileForm = () => {
  const {
    formData,
    currentStep,
    polygonCoordinates,
    canProceed,
    setFieldValue,
    addProduct,
    removeProduct,
    updateProduct,
    handleNextStep,
    handlePreviousStep,
    handleSubmit,
  } = useFarmerForm();

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <StepHeader currentStep={currentStep} />

        <form onSubmit={handleSubmit} className={styles.form}>
          {currentStep === "personal" ? (
            <PersonalInfoSection formData={formData} setFieldValue={setFieldValue} />
          ) : null}

          {currentStep === "production" ? (
            <ProductionProfileSection
              formData={formData}
              setFieldValue={setFieldValue}
              addProduct={addProduct}
              removeProduct={removeProduct}
              updateProduct={updateProduct}
            />
          ) : null}

          {currentStep === "location" ? (
            <LocationInfoSection
              formData={formData}
              setFieldValue={setFieldValue}
              polygonPointsCount={polygonCoordinates.length}
            />
          ) : null}

          <StepNavigation
            currentStep={currentStep}
            canProceed={canProceed}
            onPrevious={handlePreviousStep}
            onNext={handleNextStep}
          />
        </form>
      </div>
    </div>
  );
};
