Orders.forEach(order => {
    const tr = document.createElement('tr');
    const trContent = `
        <td>${order.productName}</td>
        <td>${order.productNumber}</td>
        <td>${order.productStatus}</td>
        <td class="${order.status === 'Declined' ? 'danger' : order.status === 'Pending' ? 'warning' : 'Primary'}">${order.status}</td>
        <td class="primary">Details</td>
        `;
    tr.innerHTML = trContent;
    document.querySelector('table tbody').appendChild(tr);
        
    console.log("Hello world");
})