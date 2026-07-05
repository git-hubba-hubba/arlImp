import React from "react";

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
        <input className="frmSU" name="eventImage" value={eventForm.eventImage} onChange={onChange} placeholder="Event Image URL" />
        <textarea className="frmSU crudTextarea" name="eventDescription" value={eventForm.eventDescription} onChange={onChange} placeholder="Description" required />
        <button className="signUp formSubmit" type="submit">{editingEventId ? "Update Event" : "Add Event"}</button>
        {editingEventId && <button className="signUp formSubmit" type="button" onClick={onCancel}>Cancel</button>}
      </form>
      {status && <p className="formStatus">{status}</p>}
    </div>
  );
}

export default EventFormModal;
