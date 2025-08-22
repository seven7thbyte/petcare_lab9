document.addEventListener('DOMContentLoaded', () => {
  const petForm = document.getElementById('addPetForm');
  const petTableBody = document.getElementById('petTableBody');

  const loadPets = () => {
    fetch('/api/pets')
      .then(res => res.json())
      .then(pets => {
        petTableBody.innerHTML = '';
        pets.forEach(pet => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td class="border p-2">${pet.name}</td>
            <td class="border p-2">${pet.type}</td>
            <td class="border p-2">${pet.age}</td>
            <td class="border p-2 space-x-2">
              <button onclick="editPet(${pet.id}, '${pet.name}', '${pet.type}', ${pet.age})" class="bg-yellow-400 text-white px-2 py-1 rounded">Edit</button>
              <button onclick="deletePet(${pet.id})" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
            </td>
          `;
          petTableBody.appendChild(row);
        });
      });
  };

  petForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(petForm);
    const data = Object.fromEntries(formData.entries());

    fetch('/api/pets', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
    .then(() => {
      petForm.reset();
      loadPets();
    });
  });

  window.deletePet = (id) => {
    if (confirm('Delete this pet?')) {
      fetch(`/api/pets/${id}`, { method: 'DELETE' })
        .then(() => loadPets());
    }
  };

  window.editPet = (id, name, type, age) => {
    const newName = prompt('Pet Name:', name);
    const newType = prompt('Pet Type:', type);
    const newAge = prompt('Pet Age:', age);

    if (newName && newType && newAge) {
      fetch(`/api/pets/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ name: newName, type: newType, age: newAge })
      }).then(() => loadPets());
    }
  };

  loadPets();
});
