import React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { isSlideValid } from "../../../utils/helperFunction";
import { QuizQuestionParams } from "@/dataHelper/quizQuestion.datahelper";

interface SlideListProps {
  slides: QuizQuestionParams[];
  activeIdx: number;
  setActiveIdx: (idx: number) => void;
  handleAddSlide: () => void;
  handleDragEnd: (result: DropResult) => void;
}

export const SlideList: React.FC<SlideListProps> = ({
  slides,
  activeIdx,
  setActiveIdx,
  handleAddSlide,
  handleDragEnd,
}) => {
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="slides" direction="horizontal">
        {(provided: any) => (
          <div
            className="w-full flex items-center bg-[#fde3b0]/70 rounded-md px-3 scrollbar-thin scrollbar-thumb-[#c62828] scrollbar-track-[#fde3b0] hover:scrollbar-thumb-[#a31515]"
            style={{ height: "104px" }}
          >
            <div
              className="overflow-x-auto overflow-y-hidden flex-1 h-full"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div
                className="flex flex-nowrap items-center w-max"
                style={{ height: "80px" }}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {slides.map((slide, idx) => {
                  const hasError = !isSlideValid(slide);
                  return (
                    <Draggable
                      key={slide.number}
                      draggableId={slide.number.toString()}
                      index={idx}
                    >
                      {(provided: any) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`w-20 h-20 rounded-lg mr-4 flex flex-col items-center justify-center relative cursor-pointer transition-all border overflow-hidden shadow-md ${
                            activeIdx === idx
                              ? "bg-[#fff5d6] border-white border-4"
                              : "bg-[#e0b97d] border-[#c62828] border-2"
                          }`}
                          onClick={() => setActiveIdx(idx)}
                        >
                          <span className="text-black text-xs absolute top-1 left-2">
                            {slide.number}
                          </span>
                          {slide.image_url ? (
                            <>
                              <img
                                src={slide.image_url}
                                alt="slide thumbnail"
                                className="w-10 h-10 object-cover rounded shadow mx-auto"
                                style={{ maxWidth: 36, maxHeight: 36 }}
                              />
                              {slide.question && (
                                <span className="text-black text-[8px] text-center break-words line-clamp-2 px-1 w-full">
                                  {slide.question}
                                </span>
                              )}
                            </>
                          ) : (
                            <span className="text-black text-xs text-center line-clamp-2 px-1">
                              {slide.question || "(No title)"}
                            </span>
                          )}
                          {hasError && (
                            <span className="absolute top-1 right-1 z-10 bg-[#ff6b81] text-white rounded-full w-[20px] h-[20px] flex items-center justify-center font-bold text-base border-2 border-[#29727a]">
                              !
                            </span>
                          )}
                        </div>
                      )}
                    </Draggable>
                  );
                })}
              </div>
            </div>
            <button
              onClick={handleAddSlide}
              className="flex items-center justify-center bg-[#c62828] text-white rounded-xl w-14 h-14 text-3xl font-bold cursor-pointer shadow transition hover:bg-[#b71c1c] ml-4 flex-shrink-0"
            >
              <span>+</span>
            </button>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
