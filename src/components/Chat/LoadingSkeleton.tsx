import React from "react";
import { Skeleton } from "@mui/material";
import { Stack } from "@mui/system";

const LoadingSkeleton: React.FC = () => {
  const getRandomHeight = (number: number) => {
    const randomNumbers = [0.5, 0.3, 0.7, 0.2, 0.3, 0.9, 0.1, 0.4, 0.2];
    const minHeight = 20;
    const maxHeight = 70;
    return Math.floor(
      randomNumbers[number] * (maxHeight - minHeight + 1) + minHeight
    );
  };

  return (
    <Stack direction="column" gap={3} p={2} overflow="hidden">
      {Array.from(Array(7).keys()).map((number, i) => (
        <>
          {i % 2 === 0 ? (
            <div key={number}>
              <Skeleton
                variant="text"
                style={{ backgroundColor: "rgb(255 255 255 / 13%)" }}
                width={40}
                sx={{ marginLeft: 4 }}
              />
              <Stack direction="row" alignItems="flex-start" gap={0.5}>
                <Skeleton
                  style={{ backgroundColor: "rgb(255 255 255 / 13%)" }}
                  variant="circular"
                  width={27}
                  height={27}
                />
                <Skeleton
                  style={{ backgroundColor: "rgb(255 255 255 / 13%)" }}
                  variant="rounded"
                  width={210}
                  height={getRandomHeight(number)}
                  sx={{ borderRadius: 4, borderTopLeftRadius: 3 }}
                />
              </Stack>
            </div>
          ) : (
            <Skeleton
              style={{ backgroundColor: "rgb(255 255 255 / 13%)" }}
              key={number}
              variant="rounded"
              width={180}
              height={getRandomHeight(number)}
              sx={{
                alignSelf: "flex-end",
                borderRadius: 4,
                borderTopRightRadius: 3,
              }}
            />
          )}
        </>
      ))}
    </Stack>
  );
};

export default LoadingSkeleton;
