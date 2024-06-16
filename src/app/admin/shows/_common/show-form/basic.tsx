import React from "react";
import { ShowFormStepsProps } from ".";
import { Button, Form, Input, Select } from "antd";
import { useRouter } from "next/navigation";

function Basic({
  activeStep,
  setActiveStep,
  showFormData,
  setShowFormData,
}: ShowFormStepsProps) {
  const router = useRouter();
  let disableNextButton = false;
  if (
    !showFormData.title ||
    !showFormData.type ||
    !showFormData.genre ||
    !showFormData.durationInMinutes
  ) {
    disableNextButton = true;
  }
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <Form.Item label="Title" required>
          <Input
            value={showFormData.title}
            onChange={(e) =>
              setShowFormData({ ...showFormData, title: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item label="Type" required>
          <Select
            value={showFormData.type}
            onChange={(value) =>
              setShowFormData({ ...showFormData, type: value })
            }
          >
            <Select.Option value="movie">Movie</Select.Option>
            <Select.Option value="web-series">Web Series</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Genre" required>
          <Select
            value={showFormData.genre}
            onChange={(value) =>
              setShowFormData({ ...showFormData, genre: value })
            }
          >
            <Select.Option value="action">Action</Select.Option>
            <Select.Option value="comedy">Comedy</Select.Option>
            <Select.Option value="drama">Drama</Select.Option>
            <Select.Option value="romance">Romance</Select.Option>
            <Select.Option value="thriller">Thriller</Select.Option>
            <Select.Option value="horror">Horror</Select.Option>
          </Select>
        </Form.Item>
      </div>

      <Form.Item label="Description">
        <Input.TextArea
          value={showFormData.description}
          onChange={(e) =>
            setShowFormData({ ...showFormData, description: e.target.value })
          }
        />
      </Form.Item>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <Form.Item label="Thearitical Release Date">
          <Input
            type="date"
            value={showFormData.theariticalReleaseDate}
            onChange={(e) =>
              setShowFormData({
                ...showFormData,
                theariticalReleaseDate: e.target.value,
              })
            }
          />
        </Form.Item>

        <Form.Item label="OTT Release Date">
          <Input
            type="date"
            value={showFormData.ottReleaseDate}
            onChange={(e) =>
              setShowFormData({
                ...showFormData,
                ottReleaseDate: e.target.value,
              })
            }
          />
        </Form.Item>

        <Form.Item label="Duration in Minutes" required>
          <Input
            type="number"
            value={showFormData.durationInMinutes}
            onChange={(e) =>
              setShowFormData({
                ...showFormData,
                durationInMinutes: e.target.value,
              })
            }
          />
        </Form.Item>
      </div>

      <div className="flex justify-end gap-7">
        <Button onClick={() => router.push("/admin/shows")}>Cancel</Button>
        <Button
          type="primary"
          onClick={() => setActiveStep(activeStep + 1)}
          disabled={disableNextButton}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default Basic;
