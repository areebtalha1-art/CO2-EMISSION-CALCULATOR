const emissionFactors = {
  electricity: 0.4,
  gas: 5.3,
  petrol: 2.31,
  diesel: 2.68,
  flight: 0.18,
  waste: 0.5,
};

const form = document.getElementById('calculator-form');
const totalEmissions = document.getElementById('total-emissions');
const equivalentText = document.getElementById('equivalent');
const carEquivalentText = document.getElementById('car-equivalent');
const breakdownList = document.getElementById('breakdown-list');

function formatNumber(value) {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 1,
  }).format(value);
}

function calculateEmission() {
  const electricity = Number(document.getElementById('electricity').value || 0);
  const gas = Number(document.getElementById('gas').value || 0);
  const petrol = Number(document.getElementById('petrol').value || 0);
  const diesel = Number(document.getElementById('diesel').value || 0);
  const flight = Number(document.getElementById('flight').value || 0);
  const waste = Number(document.getElementById('waste').value || 0);

  const breakdown = [
    {
      name: 'Electricity',
      value: electricity * emissionFactors.electricity,
    },
    {
      name: 'Natural gas',
      value: gas * emissionFactors.gas,
    },
    {
      name: 'Petrol',
      value: petrol * emissionFactors.petrol,
    },
    {
      name: 'Diesel',
      value: diesel * emissionFactors.diesel,
    },
    {
      name: 'Flights',
      value: flight * emissionFactors.flight,
    },
    {
      name: 'Waste',
      value: waste * emissionFactors.waste,
    },
  ];

  const total = breakdown.reduce((sum, item) => sum + item.value, 0);
  const treeEquivalent = total / 21;
  const carEquivalent = total / 0.192;

  totalEmissions.textContent = `${formatNumber(total)} kg`;
  equivalentText.textContent = `${formatNumber(treeEquivalent)} trees`;
  carEquivalentText.textContent = `${formatNumber(carEquivalent)} km`;

  breakdownList.innerHTML = breakdown
    .filter((item) => item.value > 0)
    .map(
      (item) => `
        <li>
          <span>${item.name}</span>
          <strong>${formatNumber(item.value)} kg</strong>
        </li>
      `,
    )
    .join('');

  if (!breakdown.some((item) => item.value > 0)) {
    breakdownList.innerHTML = '<li><span>No emissions entered</span><strong>0 kg</strong></li>';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  calculateEmission();
});

form.addEventListener('reset', () => {
  requestAnimationFrame(() => calculateEmission());
});

calculateEmission();
