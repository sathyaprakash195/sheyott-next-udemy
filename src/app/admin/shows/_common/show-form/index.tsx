"use client";
import React from "react";
import Basic from "./basic";
import CastAndCrew from "./cast-and-crew";
import Media from "./media";
import { Form, Steps, message } from "antd";
import { uploadFileToFirebaseAndReturnUrl } from "@/helpers/uploads";
import { createNewShow, editShowById } from "@/server-actions/shows";
import { useRouter } from "next/navigation";

function ShowForm({
  type = "add",
  initialValues,
}: {
  type?: "add" | "edit";
  initialValues?: any;
}) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [showFormData, setShowFormData] = React.useState(initialValues || {});
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const commonProps = {
    activeStep,
    setActiveStep,
    showFormData,
    setShowFormData,
    loading,
  };

  const stepsData = [
    {
      name: "Basic",
      component: <Basic {...commonProps} />,
    },
    {
      name: "Cast & Crew",
      component: <CastAndCrew {...commonProps} />,
    },
    {
      name: "Media",
      component: <Media {...commonProps} />,
    },
  ];

  const onFinish = async () => {
    try {
      setLoading(true);

      const payload = { ...showFormData };

      if (typeof showFormData.mainImage === "object") {
        payload.mainImage = await uploadFileToFirebaseAndReturnUrl(
          showFormData.mainImage
        );
      }

      if (typeof showFormData.bannerImage === "object") {
        payload.bannerImage = await uploadFileToFirebaseAndReturnUrl(
          showFormData.bannerImage
        );
      }

      if (typeof showFormData.trailer === "object") {
        payload.trailer = await uploadFileToFirebaseAndReturnUrl(
          showFormData.trailer
        );
      }

      if (
        payload.type === "movie" &&
        typeof showFormData.content === "object"
      ) {
        payload.content = await uploadFileToFirebaseAndReturnUrl(
          showFormData.content
        );
      }

      if (payload.type === "web-series") {
        payload.episodes = await Promise.all(
          showFormData.episodes.map(async (episode: any) => {
            if (typeof episode.content === "object") {
              episode.content = await uploadFileToFirebaseAndReturnUrl(
                episode.content
              );
            }
            return episode;
          })
        );
      }

      let response: any = null;
      if (type === "add") {
        response = await createNewShow(payload);
      } else {
        response = await editShowById({
          showId: initialValues._id,
          payload,
        });
      }
      if (!response.success) {
        throw new Error(response.message);
      }
      message.success(response.message);
      router.push("/admin/shows");
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Steps current={activeStep}>
        {stepsData.map((step, index) => (
          <Steps.Step key={index} title={step.name} />
        ))}
      </Steps>
      <div className="mt-5">{stepsData[activeStep].component}</div>
    </Form>
  );
}

export default ShowForm;

export interface ShowFormStepsProps {
  activeStep: number;
  setActiveStep: (step: number) => void;
  showFormData: any;
  setShowFormData: (data: any) => void;
  loading: boolean;
}
