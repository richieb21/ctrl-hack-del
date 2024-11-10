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

  return (
    <Draggable draggableId={`section-${index}`} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={provided.draggableProps.style}
        >
          <div className="section-header" {...provided.dragHandleProps}>
            <h2>{sectionTitle}</h2>
          </div>
          <Droppable droppableId={`section-${index}`} type="subsection">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="items"
              >
                {items?.map((item, itemIndex) => (
                  <DraggableItem
                    key={`${sectionTitle}-${itemIndex}`}
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
