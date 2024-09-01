"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

import { Container } from "@/components/container";
import { Skeleton } from "@/components/ui/skeleton";

const Page = () => {
  const [photo, setPhoto] = useState<any>([]);
  const [loadingPhoto, setLoadingPhoto] = useState<boolean>(true);
  const [errorPhoto, setErrorPhoto] = useState<string>("");

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoadingPhoto(true);

        const response = await axios.get("/api/photo");
        setPhoto(response?.data?.result);
      } catch (error) {
        setLoadingPhoto(false);
      } finally {
        setLoadingPhoto(false);
      }
    };

    fetch();
  }, []);

  return (
    <Container>
      {loadingPhoto && (
        <div className="grid grid-cols-2 xl:grid-cols-10 gap-1">
          {[...Array(20)].map((_, i) => (
            <Skeleton key={i} className="h-48 w-44" />
          ))}
        </div>
      )}

      {!loadingPhoto && (
        <PhotoProvider>
          <div className="grid grid-cols-2 xl:grid-cols-10 gap-1 group">
            {photo?.map((photo: any) => (
              <PhotoView key={photo?.id} src={photo?.url}>
                <div className="h-48 w-44  cursor-pointer rounded-md relative overflow-hidden">
                  <img
                    className="object-cover w-full h-full aspect-square hover:scale-110 transition duration-300 ease-in-out"
                    src={photo?.url}
                    alt={photo?.name}
                  />
                </div>
              </PhotoView>
            ))}
          </div>
        </PhotoProvider>
      )}
    </Container>
  );
};

export default Page;
