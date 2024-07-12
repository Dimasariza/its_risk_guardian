import { Card } from "primereact/card";
import { Image } from "primereact/image";

function CorrosionLoop() {
    return (
        <>
            <Card title="Asset Detail">
                <div className="flex justify-content-center">
                    <Image src="https://primefaces.org/cdn/primereact/images/galleria/galleria10.jpg" alt="Image" width="100%" preview />
                </div>
            </Card>
        </>
    )
}

export default CorrosionLoop;