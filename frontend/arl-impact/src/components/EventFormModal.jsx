import React from "react";
import MediaUploadButton from "./MediaUploadButton";

function EventFormModal({
  editingEventId,
  eventForm,
  onCancel,
  onChange,
  onSubmit,
  status,
}) {
  return (
    <div className="crudPanel modalCrudPanel">
      <form className="crudForm" onSubmit={onSubmit}>
        <input className="frmSU" name="eventName" value={eventForm.eventName} onChange={onChange} placeholder="Event Name" required />
        <input className="frmSU" name="eventLocation" value={eventForm.eventLocation} onChange={onChange} placeholder="Location" required />
        <input className="frmSU" name="eventDate" value={eventForm.eventDate} onChange={onChange} type="date" required />
        <MediaUploadButton
          accept="image/*,video/*"
          label="Upload Event Media"
          name="eventImage"
          onChange={onChange}
          value={eventForm.eventImage}
        />
        <input className="frmSU" name="attendanceCode" value={eventForm.attendanceCode} onChange={onChange} placeholder="Attendance Code" />
        <input className="frmSU" name="attendancePoints" value={eventForm.attendancePoints} onChange={onChange} placeholder="Attendance Points" type="number" min="0" />
        <textarea className="frmSU crudTextarea" name="eventDescription" value={eventForm.eventDescription} onChange={onChange} placeholder="Description" required />
        <button className="signUp formSubmit" type="submit">{editingEventId ? "Update Event" : "Add Event"}</button>
        {editingEventId && <button className="signUp formSubmit" type="button" onClick={onCancel}>Cancel</button>}
      </form>
      {status && <p className="formStatus">{status}</p>}
    </div>
  );
}

export default EventFormModal;
