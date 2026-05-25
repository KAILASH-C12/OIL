async function check() {
    try {
        console.log('Fetching local backend health...');
        const res = await fetch('http://localhost:5000/api/v1/health');
        console.log('Health status:', res.status);
        const data = await res.json();
        console.log('Health response:', data);
        
        console.log('Fetching local backend products...');
        const resProd = await fetch('http://localhost:5000/api/v1/products');
        console.log('Products status:', resProd.status);
        const dataProd = await resProd.json();
        console.log('Products count:', dataProd.count);
    } catch (err) {
        console.error('Connection failed:', err.message);
    }
}
check();
