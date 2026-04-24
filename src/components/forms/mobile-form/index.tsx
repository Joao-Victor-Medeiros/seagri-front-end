import { PersonalInfoSection } from "./sections/personal-info";
import { ProductionProfileSection } from "./sections/production-profile";
import { LocationInfoSection } from "./sections/location-info";
import { StepHeader } from "./step-header";
import { StepNavigation } from "./step-navigation";
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
    isSubmitting,
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
            isSubmitting={isSubmitting}
            onPrevious={handlePreviousStep}
            onNext={handleNextStep}
          />
        </form>
      </div>
    </div>
  );
};
