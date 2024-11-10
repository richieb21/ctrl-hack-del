import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { ResumeItem } from "../../constants/types";

interface DraggableItemProps {
  item: ResumeItem;
  sectionId: string;
  index: number;
}

const DraggableItem: React.FC<DraggableItemProps> = ({
  item,
  sectionId,
  index,
}) => {
  if (!item || !item.subPoints) return null;

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="resume-item"
        >
          <div className="item-header" {...provided.dragHandleProps}>
            <h3>{item.title}</h3>
            <div className="item-subheader">
              <span>{item.subTitle}</span>
              <span>{item.location}</span>
              <span>{`${item.timeFrom} - ${item.timeTo}`}</span>
            </div>
          </div>
          <Droppable droppableId={item.id} type="bullet">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bullet-points"
              >
                {item.subPoints.map((point, pointIndex) => (
                  <Draggable
                    key={point.id}
                    draggableId={point.id}
                    index={pointIndex}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bullet-point"
                      >
                        {point.text}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default DraggableItem;
