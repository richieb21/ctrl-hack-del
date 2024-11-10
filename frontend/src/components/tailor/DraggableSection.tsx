import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { ResumeSection } from "../../constants/types";
import DraggableItem from "./DraggableItem";

interface DraggableSectionProps {
  section: ResumeSection;
  index: number;
}

const DraggableSection: React.FC<DraggableSectionProps> = ({
  section,
  index,
}) => {
  if (!section.items) return null;

  return (
    <Draggable draggableId={section.id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <div className="section-header" {...provided.dragHandleProps}>
            <h2>{section.title}</h2>
          </div>
          <Droppable droppableId={section.id} type="subsection">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="items"
              >
                {section.items.map((item, itemIndex) => (
                  <DraggableItem
                    key={item.id}
                    item={item}
                    sectionId={section.id}
                    index={itemIndex}
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
