"use client";
import { IShow } from "@/interfaces/shows";
import { Button, Modal } from "antd";
import { DollarSign, PlayIcon } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import { IUsersGlobalStore, useUsersGlobalStore } from "@/store/users-store";

function ActionButtons({ show }: { show: IShow }) {
  const [showTrailerPlayModal, setShowTrailerPlayModal] = React.useState(false);
  const [showMoviePlayModal, setShowMoviePlayModal] = React.useState(false);
  const [episiodePlayModal, setEpisodePlayModal] = React.useState(false);
  const [selectedEpisode, setSelectedEpisode] = React.useState<any>(null);
  const router = useRouter();
  const { loggedInUserData }: IUsersGlobalStore = useUsersGlobalStore() as any;

  const userHasSubscription = loggedInUserData?.currentSubscription;

  return (
    <div className="flex flex-col gap-5 mt-7">
      {!userHasSubscription && (
        <h1 className="text-sm">Subscribe to watch this show</h1>
      )}
      <div className="flex flex-wrap gap-5">
        <Button
          icon={<PlayIcon size={14} />}
          type={userHasSubscription ? "default" : "primary"}
          onClick={() => setShowTrailerPlayModal(true)}
        >
          Play Trailer
        </Button>

        {userHasSubscription && show.type === "movie" && (
          <Button
            icon={<PlayIcon size={14} />}
            type="primary"
            onClick={() => setShowMoviePlayModal(true)}
          >
            Play Movie
          </Button>
        )}

        {userHasSubscription && show.type === "web-series" && (
          <Button
            icon={<PlayIcon size={14} />}
            type="primary"
            onClick={() => {
              setEpisodePlayModal(true);
              setSelectedEpisode({
                ...show.episodes[0],
                episodeNumber: 1,
              });
            }}
          >
            Play Now
          </Button>
        )}

        {!userHasSubscription && (
          <Button
            icon={<DollarSign size={14} />}
            onClick={() => router.push(`/profile`)}
          >
            Subscribe Now
          </Button>
        )}
      </div>

      {show.type === "web-series" && (
        <div className="flex flex-col gap-5">
          <h1 className="text-lg font-bold text-gray-500">
            Episodes ({show.episodes.length})
          </h1>

          <div className="flex flex-col gap-5">
            {show.episodes.map((episode: any, index: number) => (
              <div className="flex justify-between border border-black border-solid p-2 rounded-sm">
                <h1 className="text-sm">
                  {index + 1}. {episode.title}
                </h1>
                <Button
                  icon={<PlayIcon size={14} />}
                  type="primary"
                  onClick={() => {
                    setEpisodePlayModal(true);
                    setSelectedEpisode({
                      ...episode,
                      episodeNumber: index + 1,
                    });
                  }}
                  size="small"
                >
                  Play Now
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {showTrailerPlayModal && (
        <Modal
          centered
          open={showTrailerPlayModal}
          onCancel={() => setShowTrailerPlayModal(false)}
          title={`Trailer - ${show.title}`}
          footer={null}
        >
          <MediaPlayer title={show.title} src={show.trailer}>
            <MediaProvider />
            <DefaultVideoLayout
              thumbnails={show.bannerImage}
              icons={defaultLayoutIcons}
            />
          </MediaPlayer>
        </Modal>
      )}

      {showMoviePlayModal && (
        <Modal
          centered
          open={showMoviePlayModal}
          onCancel={() => setShowMoviePlayModal(false)}
          title={`Movie - ${show.title}`}
          footer={null}
        >
          <MediaPlayer title={show.title} src={show.content}>
            <MediaProvider />
            <DefaultVideoLayout
              thumbnails={show.bannerImage}
              icons={defaultLayoutIcons}
            />
          </MediaPlayer>
        </Modal>
      )}

      {episiodePlayModal && (
        <Modal
          centered
          open={episiodePlayModal}
          onCancel={() => setEpisodePlayModal(false)}
          title={`${show.title} - ${selectedEpisode.title} (Episode ${selectedEpisode.episodeNumber})`}
          footer={null}
        >
          <MediaPlayer
            title={selectedEpisode.title}
            src={selectedEpisode.content}
          >
            <MediaProvider />
            <DefaultVideoLayout
              thumbnails={selectedEpisode.bannerImage}
              icons={defaultLayoutIcons}
            />
          </MediaPlayer>
        </Modal>
      )}
    </div>
  );
}

export default ActionButtons;
