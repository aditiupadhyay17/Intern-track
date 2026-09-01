// Change this if your Spring Boot backend runs on a different host/port
const API_BASE = "https://interntrack-backend-lx5c.onrender.com/api/applications";

const form = document.getElementById("application-form");
const tableBody = document.getElementById("applications-body");
const statusMessage = document.getElementById("status-message");
const submitBtn = document.getElementById("submit-btn");
const cancelBtn = document.getElementById("cancel-btn");
const formTitle = document.getElementById("form-title");
const idField = document.getElementById("app-id");

const STATUS_LABELS = {
  APPLIED: "Applied",
  OA_ROUND: "OA Round",
  INTERVIEW: "Interview",
  OFFER: "Offer",
  REJECTED: "Rejected",
};

let editingId = null;

async function fetchApplications() {
  try {
    const res = await fetch(API_BASE);
    if (!res.ok) throw new Error("Failed to load applications");
    const data = await res.json();
    renderTable(data);
    showMessage("");
  } catch (err) {
    showMessage("Could not connect to the backend. Is Spring Boot running on port 8080?", true);
  }
}

function renderTable(applications) {
  tableBody.innerHTML = "";

  if (applications.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:#94a3b8;">No applications yet — add your first one above.</td></tr>`;
    return;
  }

  applications.forEach((app) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${escapeHtml(app.companyName)}</td>
      <td>${escapeHtml(app.role)}</td>
      <td><span class="badge ${app.status}">${STATUS_LABELS[app.status] || app.status}</span></td>
      <td>${app.dateApplied || "—"}</td>
      <td>${escapeHtml(app.notes || "—")}</td>
      <td class="row-actions">
        <button class="edit-btn" data-id="${app.id}">Edit</button>
        <button class="delete-btn" data-id="${app.id}">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });

  document.querySelectorAll(".edit-btn").forEach((btn) =>
    btn.addEventListener("click", () => startEdit(btn.dataset.id, applications))
  );
  document.querySelectorAll(".delete-btn").forEach((btn) =>
    btn.addEventListener("click", () => deleteApplication(btn.dataset.id))
  );
}

function startEdit(id, applications) {
  const app = applications.find((a) => String(a.id) === String(id));
  if (!app) return;

  editingId = app.id;
  idField.value = app.id;
  document.getElementById("companyName").value = app.companyName;
  document.getElementById("role").value = app.role;
  document.getElementById("status").value = app.status;
  document.getElementById("dateApplied").value = app.dateApplied || "";
  document.getElementById("notes").value = app.notes || "";

  formTitle.textContent = "Edit Application";
  submitBtn.textContent = "Save Changes";
  cancelBtn.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function resetForm() {
  form.reset();
  editingId = null;
  idField.value = "";
  formTitle.textContent = "Add Application";
  submitBtn.textContent = "Add Application";
  cancelBtn.classList.add("hidden");
}

async function deleteApplication(id) {
  if (!confirm("Delete this application?")) return;
  try {
    const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
    if (!res.ok && res.status !== 204) throw new Error("Delete failed");
    fetchApplications();
  } catch (err) {
    showMessage("Failed to delete application.", true);
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    companyName: document.getElementById("companyName").value.trim(),
    role: document.getElementById("role").value.trim(),
    status: document.getElementById("status").value,
    dateApplied: document.getElementById("dateApplied").value || null,
    notes: document.getElementById("notes").value.trim(),
  };

  try {
    const url = editingId ? `${API_BASE}/${editingId}` : API_BASE;
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Save failed");

    resetForm();
    fetchApplications();
  } catch (err) {
    showMessage("Failed to save application. Check all required fields.", true);
  }
});

cancelBtn.addEventListener("click", resetForm);

function showMessage(text, isError = false) {
  statusMessage.textContent = text;
  statusMessage.className = isError ? "error" : "";
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str ?? "";
  return div.innerHTML;
}

// Initial load
fetchApplications();
