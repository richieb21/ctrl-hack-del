import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { ResumeItem } from "../../constants/types";
import DraggableItem from "./DraggableItem";

interface DraggableSectionProps {
  sectionTitle: string;
  items: ResumeItem[];
  index: number;
}

const DraggableSection: React.FC<DraggableSectionProps> = ({
  sectionTitle,
  items,
  index,
}) => {
  if (!items) return null;

  const sectionId = `section-${index}-${sectionTitle
    .toLowerCase()
    .replace(/\s+/g, "-")}`;

  return (
    <Draggable draggableId={sectionId} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={provided.draggableProps.style}
        >
          <div className="section-header" {...provided.dragHandleProps}>
            <h2>{sectionTitle}</h2>
          </div>
          <Droppable droppableId={sectionId} type="subsection">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="items"
              >
                {items?.map((item, itemIndex) => (
                  <DraggableItem
                    key={`item-${sectionId}-${itemIndex}`}
                    item={item}
                    sectionIndex={index}
                    itemIndex={itemIndex}
                  />
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

export default DraggableSection;
