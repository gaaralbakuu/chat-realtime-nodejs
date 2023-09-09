import React from "react";
import PropTypes from "prop-types";
import { useMemo } from "react";

function RenderAvatarConversation({ list }) {
  const renderList = useMemo(() => {
    if (list.length <= 4) {
      return list;
    } else {
      return [...list.slice(0, 3), list.slice(3).length];
    }
  });

  return (
    <div className="w-full h-full relative">
      {renderList.length === 1 && (
        <div className="w-full h-full rounded-full bg-red-500 flex justify-center items-center text-white font-medium text-lg select-none border border-solid border-white">
          {renderList[0]}
        </div>
      )}
      {renderList.length === 2 && (
        <>
          <div className="relative z-[1]">
            <div className="abosulte w-2/3 flex justify-center items-center text-white font-medium select-none">
              <div className="pb-[100%] relative flex-1">
                <div className="absolute inset-0 flex justify-center items-center text-sm rounded-full bg-blue-500 border border-solid border-white">
                  {renderList[0]}
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-2/3 flex justify-center items-center text-white font-medium text-lg select-none">
            <div className="pb-[100%] relative flex-1">
              <div className="absolute inset-0 flex justify-center items-center text-sm rounded-full bg-red-500 border border-solid border-white">
                {renderList[1]}
              </div>
            </div>
          </div>
        </>
      )}
      {renderList.length === 3 && (
        <>
          <div className="absolute left-1/2 -translate-x-1/2 w-3/5 flex justify-center items-center text-white font-medium select-none z-[2]">
            <div className="pb-[100%] relative flex-1">
              <div className="absolute inset-0 flex justify-center items-center text-sm rounded-full bg-blue-500 border border-solid border-white">
                {renderList[0]}
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-3/5 flex justify-center items-center text-white font-medium text-lg select-none z-[1]">
            <div className="pb-[100%] relative flex-1">
              <div className="absolute inset-0 flex justify-center items-center text-sm rounded-full bg-red-500 border border-solid border-white">
                {renderList[1]}
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-3/5 flex justify-center items-center text-white font-medium text-lg select-none z-[0]">
            <div className="pb-[100%] relative flex-1">
              <div className="absolute inset-0 flex justify-center items-center text-sm rounded-full bg-yellow-500 border border-solid border-white">
                {renderList[2]}
              </div>
            </div>
          </div>
        </>
      )}
      {renderList.length >= 4 && (
        <>
          <div className="absolute w-[55%] flex justify-center items-center text-white font-medium select-none z-[3]">
            <div className="pb-[100%] relative flex-1">
              <div className="absolute inset-0 flex justify-center items-center text-xs rounded-full bg-blue-500 border border-solid border-white">
                {renderList[0]}
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-[55%] flex justify-center items-center text-white font-medium text-lg select-none z-[2]">
            <div className="pb-[100%] relative flex-1">
              <div className="absolute inset-0 flex justify-center items-center text-xs rounded-full bg-red-500 border border-solid border-white">
                {renderList[1]}
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-[55%] flex justify-center items-center text-white font-medium text-lg select-none z-[0]">
            <div className="pb-[100%] relative flex-1">
              <div className="absolute inset-0 flex justify-center items-center text-xs rounded-full bg-yellow-500 border border-solid border-white">
                {renderList[2]}
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-[55%] flex justify-center items-center text-gray-600 font-medium text-lg select-none z-[1]">
            <div className="pb-[100%] relative flex-1">
              <div className="absolute inset-0 flex justify-center items-center text-xs rounded-full bg-gray-300 border border-solid border-white">
                {renderList[3]}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

RenderAvatarConversation.propTypes = {};

export default RenderAvatarConversation;
