import React, { useEffect, useState } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import DraggableSection from "./tailor/DraggableSection";
import { useResume } from "../context/ResumeContext";
import NavBar from "./NavBar";
import "./Tailor.css";
import { api } from "../services/api";

const Tailor: React.FC = () => {
  const { resume, loading, error, setResume, refreshResume } = useResume();
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    refreshResume();
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
      const sourceSectionIndex = newResume.sections.findIndex(
        (section) => section.id === source.droppableId
      );
      const destinationSectionIndex = newResume.sections.findIndex(
        (section) => section.id === destination.droppableId
      );

      if (sourceSectionIndex === -1 || destinationSectionIndex === -1) return;

      const sourceSection = newResume.sections[sourceSectionIndex];
      const destinationSection = newResume.sections[destinationSectionIndex];

      const [movedItem] = sourceSection.items.splice(source.index, 1);
      destinationSection.items.splice(destination.index, 0, movedItem);
    } else if (type === "bullet") {
      const sourceItem = newResume.sections
        .flatMap((section) => section.items)
        .find((item) => item.id === source.droppableId);
      const destinationItem = newResume.sections
        .flatMap((section) => section.items)
        .find((item) => item.id === destination.droppableId);

      if (!sourceItem || !destinationItem) return;

      const [movedPoint] = sourceItem.subPoints.splice(source.index, 1);
      destinationItem.subPoints.splice(destination.index, 0, movedPoint);
    }

    setResume(newResume);
  };

  const handleSave = async () => {
    if (!resume) return;

    try {
      setIsSaving(true);
      await api.saveResumeOrder(resume);
      await refreshResume();
      alert("Resume order saved successfully!");
    } catch (err) {
      console.error("Error saving resume order:", err);
      alert("Failed to save resume order. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-row m-5">
        <NavBar />
        <div className="flex-grow">
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-row m-5">
        <NavBar />
        <div className="flex-grow">
          <div className="error-container">
            <p>{error}</p>
            <button onClick={refreshResume}>Retry</button>
          </div>
        </div>
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="flex flex-row m-5">
        <NavBar />
        <div className="flex-grow">
          <div>No resume data available.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row m-5">
      <NavBar />
      <div className="flex-grow">
        {resume && resume.sections && resume.sections.length > 0 ? (
          <>
            <div className="m-5 p-8 rounded-xl text-center">
              <h1 className="text-4xl font-bold text-blue-500 mb-1">
                Resume Builder
              </h1>
              <p className="text-gray-600 text-lg">
                Drag and drop your resume points and resume items to reorder
                them!
              </p>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="sections" type="section">
                {(provided) => (
                  <div
                    className="sections"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {resume.sections.map((section, index) => (
                      <DraggableSection
                        key={section.id}
                        section={section}
                        index={index}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <div className="flex justify-center my-8">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </>
        ) : (
          <div>Loading resume sections...</div>
        )}
      </div>
    </div>
  );
};

export default Tailor;
