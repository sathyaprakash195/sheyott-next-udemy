import React from "react";
import { ShowFormStepsProps } from ".";
import { Button, Form, Input, Upload } from "antd";

function Media({
  activeStep,
  setActiveStep,
  showFormData,
  setShowFormData,
  loading,
}: ShowFormStepsProps) {
  const addNewEpisodeHandler = () => {
    const newEpisodes = showFormData.episodes || [];
    newEpisodes.push({
      title: "",
      content: "",
    });
    setShowFormData({
      ...showFormData,
      episodes: newEpisodes,
    });
  };

  const onEpisodeDelete = (index: number) => {
    const newEpisodes = [...showFormData.episodes];
    newEpisodes.splice(index, 1);
    setShowFormData({
      ...showFormData,
      episodes: newEpisodes,
    });
  };

  const onEpisodeChange = (index: number, key: string, value: any) => {
    const newEpisodes = [...showFormData.episodes];
    newEpisodes[index][key] = value;
    setShowFormData({
      ...showFormData,
      episodes: newEpisodes,
    });
  };

  const disableNextButton = showFormData?.episodes?.some(
    (episode: any) => !episode.title || !episode.content
  );

  const getFilesListArray = (fileOrUrl: any) => {
    if (!fileOrUrl) return [];

    if (typeof fileOrUrl === "string") {
      return [{ url: fileOrUrl }];
    }
    return [
      {
        ...fileOrUrl,
        url: URL.createObjectURL(fileOrUrl),
      },
    ];
  };

  return (
    <div>
      <h1 className="text-lg font-bold">Promotional Content</h1>

      <div className="mt-7 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div>
          <span>Main Image</span>
          <Upload
            listType="picture-card"
            beforeUpload={(file) => {
              setShowFormData({ ...showFormData, mainImage: file });
              return false;
            }}
            accept="image/*"
            maxCount={1}
            fileList={getFilesListArray(showFormData.mainImage)}
          >
            <div className="text-xs">
              {showFormData.mainImage ? "Change" : "Upload"}
            </div>
          </Upload>
        </div>

        <div>
          <span>Banner Image</span>
          <Upload
            listType="picture-card"
            beforeUpload={(file) => {
              setShowFormData({ ...showFormData, bannerImage: file });
              return false;
            }}
            accept="image/*"
            maxCount={1}
            fileList={getFilesListArray(showFormData.bannerImage)}
          >
            <div className="text-xs">
              {showFormData.bannerImage ? "Change" : "Upload"}
            </div>
          </Upload>
        </div>

        <div>
          <span>Trailer</span>
          <Upload
            listType="picture-card"
            beforeUpload={(file) => {
              setShowFormData({ ...showFormData, trailer: file });
              return false;
            }}
            accept="video/*"
            maxCount={1}
            fileList={getFilesListArray(showFormData.trailer)}
          >
            <div className="text-xs">
              {showFormData.trailer ? "Change" : "Upload"}
            </div>
          </Upload>
        </div>
      </div>

      <h1 className="text-lg font-bold mt-10">Main Content</h1>

      {showFormData.type === "movie" && (
        <div className="mt-7">
          <span>Movie Content</span>
          <Upload
            listType="picture-card"
            beforeUpload={(file) => {
              setShowFormData({ ...showFormData, content: file });
              return false;
            }}
            accept="video/*"
            maxCount={1}
            fileList={getFilesListArray(showFormData.content)}
          >
            <div className="text-xs">
              {showFormData.content ? "Change" : "Upload"}
            </div>
          </Upload>
        </div>
      )}

      {showFormData.type === "web-series" && (
        <div>
          <div className="flex justify-end">
            <Button onClick={addNewEpisodeHandler}>Add Episode</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-7">
            {showFormData?.episodes?.map((eposide: any, index: number) => (
              <div className="flex flex-col gap-5 border border-solid border-black p-3 rounded-sm">
                <div className="flex items-center justify-between">
                  <h1 className="text-gray-500 font-bold text-sm">
                    Episode - {index + 1}
                  </h1>
                  <Button size="small" onClick={() => onEpisodeDelete(index)}>
                    Delete
                  </Button>
                </div>
                <Form.Item label="Title" required>
                  <Input
                    value={eposide.title}
                    onChange={(e) =>
                      onEpisodeChange(index, "title", e.target.value)
                    }
                  />
                </Form.Item>

                <Form.Item label="Content" required>
                  <Upload
                    listType="picture-card"
                    beforeUpload={(file) => {
                      onEpisodeChange(index, "content", file);
                      return false;
                    }}
                    accept="video/*"
                    maxCount={1}
                    fileList={getFilesListArray(eposide.content)}
                  >
                    <div className="text-xs">
                      {eposide.content ? "Change" : "Upload"}
                    </div>
                  </Upload>
                </Form.Item>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end gap-7">
        <Button
          disabled={loading}
          onClick={() => setActiveStep(activeStep - 1)}
        >
          Back
        </Button>
        <Button
          type="primary"
          disabled={disableNextButton}
          htmlType="submit"
          loading={loading}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

export default Media;
