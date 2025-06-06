document.addEventListener("DOMContentLoaded", function () {
    const data = [
        { title: "Calories", status: "Above Normal", color: "danger" },
        { title: "Carbohydrates", status: "Normal", color: "success" },
        { title: "Protein", status: "Below Normal", color: "warning" },
        { title: "Fats", status: "Normal", color: "success" },
        { title: "Vitamins", status: "Below Normal", color: "warning" },
        { title: "Minerals", status: "Normal", color: "success" },
    ];

    const tips = [
        "Try incorporating more leafy greens to balance your iron levels.",
        "Consider reducing sugar intake to manage blood glucose.",
    ];

    const cardContainer = document.getElementById("insightCards");
    data.forEach(item => {
        cardContainer.innerHTML += `
            <div class="col-md-4 mb-4">
                <div class="card border-${item.color}">
                    <div class="card-body">
                        <h5 class="card-title">${item.title}</h5>
                        <p class="card-text text-${item.color}">${item.status}</p>
                    </div>
                </div>
            </div>
        `;
    });

    const tipsList = document.getElementById("tipsList");
    tips.forEach(tip => {
        tipsList.innerHTML += `<li class="mb-2">• ${tip}</li>`;
    });
});
