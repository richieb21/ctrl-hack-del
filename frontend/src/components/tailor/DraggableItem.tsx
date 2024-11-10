import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { ResumeItem } from "../../constants/types";

interface DraggableItemProps {
  item: ResumeItem;
  sectionIndex: number;
  itemIndex: number;
}

const DraggableItem: React.FC<DraggableItemProps> = ({
  item,
  sectionIndex,
  itemIndex,
}) => {
  if (!item || !item.subPoints) return null;

  const itemId = `item-${sectionIndex}-${itemIndex}`;

  return (
    <Draggable draggableId={itemId} index={itemIndex}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="resume-item"
        >
          <div className="item-header">
            <h3>{item.title}</h3>
            <div className="item-subheader">
              <span>{item.subTitle}</span>
              <span>{item.location}</span>
              <span>{`${item.timeFrom} - ${item.timeTo}`}</span>
            </div>
          </div>
          <Droppable
            droppableId={`bullets-${sectionIndex}-${itemIndex}`}
            type="bullet"
          >
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bullet-points"
              >
                {item.subPoints?.map((point, index) => (
                  <Draggable
                    key={`bullet-${sectionIndex}-${itemIndex}-${index}`}
                    draggableId={`bullet-${sectionIndex}-${itemIndex}-${index}`}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bullet-point"
                      >
                        {point}
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
