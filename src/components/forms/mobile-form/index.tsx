import { useRef } from "react";
import { PersonalInfoSection } from "./sections/personal-info";
import { ProductionProfileSection } from "./sections/production-profile";
import { LocationInfoSection } from "./sections/location-info";
import { StepHeader } from "./step-header";
import { StepNavigation } from "./step-navigation";
import { useFarmerForm } from "@/hooks/form/use-farmer-form";
import { usePropertyReport, type MapCaptureHandle } from "@/hooks/map/use-property-report";
import { useMapContext } from "@/state/map/map-context";
import { calculatePolygonAreaInHectares } from "@/utils/polygon-area";
import styles from "./mobile-form.module.css";

export const MobileForm = () => {
  const captureRef = useRef<MapCaptureHandle>(null);
  const { state: mapState } = useMapContext();
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
  const { generateReport, isGenerating, error } = usePropertyReport({
    captureHandle: captureRef,
  });

  const handleGenerateReport = () => {
    void generateReport({
      nome: formData.propertyName,
      descricao: `${formData.municipality} / ${formData.state}`,
      area: calculatePolygonAreaInHectares(mapState.polygonGeoJSON),
      coordenadas: mapState.polygonGeoJSON,
    });
  };

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
              captureRef={captureRef}
              isGeneratingReport={isGenerating}
              reportError={error}
              onGenerateReport={handleGenerateReport}
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
