import React, { useEffect, useState } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { Resume } from "../constants/types";
import DraggableSection from "./tailor/DraggableSection";
import { api } from "../services/api";
import "./Tailor.css";

const Tailor: React.FC = () => {
  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      console.log("Fetching data...");
      const data = await api.generateResumeJSON();
      if (!data || !data.sections) {
        throw new Error("Invalid resume data received");
      }
      console.log(data);
      setResume(data);
      setError(null);
    } catch (err) {
      setError("Failed to load resume data. Please try again.");
      console.error("Error fetching resume:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const onDragEnd = (result: DropResult) => {
    if (!resume) return;

    const { source, destination, type } = result;
    if (!destination) return;

    const newResume = { ...resume };

    if (type === "section") {
      const [removed] = newResume.sections.splice(source.index, 1);
      newResume.sections.splice(destination.index, 0, removed);
    } else if (type === "subsection") {
      const sectionKey = Object.keys(newResume.sections[source.index])[0];
      const items = newResume.sections[source.index][sectionKey];

      const [removed] = items.splice(source.index, 1);
      items.splice(destination.index, 0, removed);
    } else if (type === "bullet") {
      const [sectionIndex, itemIndex] = source.droppableId.split("-");
      const sectionKey = Object.keys(
        newResume.sections[parseInt(sectionIndex)]
      )[0];
      const item =
        newResume.sections[parseInt(sectionIndex)][sectionKey][
          parseInt(itemIndex)
        ];

      const [removed] = item.subPoints.splice(source.index, 1);
      item.subPoints.splice(destination.index, 0, removed);
    }

    setResume(newResume);
  };

  const handleSave = async () => {
    if (!resume) return;

    try {
      alert("Resume order saved successfully!");
    } catch (err) {
      console.error("Error saving resume order:", err);
      alert("Failed to save resume order. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={() => fetchData()}>Retry</button>
      </div>
    );
  }

  if (!resume) {
    return <div>No resume data available.</div>;
  }

  return (
    <div className="tailor">
      {resume && resume.sections && resume.sections.length > 0 ? (
        <>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="sections" type="section">
              {(provided) => (
                <div
                  className="sections"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {resume.sections.map((section, index) => {
                    const sectionKey = Object.keys(section)[0];
                    return (
                      <DraggableSection
                        key={sectionKey}
                        sectionTitle={sectionKey}
                        items={section[sectionKey]}
                        index={index}
                      />
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <button onClick={handleSave}>Save Changes</button>
        </>
      ) : (
        <div>Loading resume sections...</div>
      )}
    </div>
  );
};

export default Tailor;
