// components/DocumentPreviewer.tsx
"use client";

import { Button } from "@repo/ui/components/general/Button";
import { Icon } from "@repo/ui/components/general/Icon";
import { Typography } from "@repo/ui/components/general/Typography";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

if (typeof window !== "undefined" && !pdfjs.GlobalWorkerOptions.workerSrc) {
    pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
}

type Props = {
    fileUrl: string;
};

export default function DocumentPreviewer({ fileUrl }: Props) {
    const [pageNumber, setPageNumber] = useState(1);
    const [numPages, setNumPages] = useState<number>(0);

    const fileExtension = fileUrl.split(".").pop()?.toLowerCase();

    const goToPrevPage = () => setPageNumber(prev => (prev > 1 ? prev - 1 : 1));
    const goToNextPage = () => setPageNumber(prev => (prev < (numPages || 1) ? prev + 1 : prev));


    if (!fileExtension) return <p>Invalid file</p>;

    // Image preview
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(fileExtension)) {
        return <img src={fileUrl} alt="preview" className="max-w-full rounded-lg" />;
    }

    // PDF preview
    if (fileExtension === "pdf") {
        return (
            <div className="flex flex-col w-full h-full">
                <div className="flex-grow w-full overflow-auto flex">
                    <div className="max-w-fit w-full flex justify-center">
                        <Document file={fileUrl} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
                            <Page
                                pageNumber={pageNumber}
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                            />
                        </Document>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-3 flex-shrink-0 mt-1">
                    <Button variant="ghost" size="xs" onClick={goToPrevPage} disabled={pageNumber <= 1}>
                        <Icon name="chevron-left" className="w-4 h-4" />
                    </Button>
                    <Typography className="text-sm">
                        {pageNumber} / {numPages || '-'}
                    </Typography>
                    <Button variant="ghost" size="xs" onClick={goToNextPage} disabled={pageNumber >= (numPages || 1)}>
                        <Icon name="chevron-right" className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        );
    }

    // Office docs (Word, Excel, PPT) via Microsoft Viewer
    if (["doc", "docx", "xls", "xlsx", "ppt", "pptx"].includes(fileExtension)) {
        const officeViewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`;
        return (
            <iframe
                src={officeViewerUrl}
                width="100%"
                height="h-full"
                className="border rounded-lg"
            />
        );
    }

    // Fallback (txt, md, etc.)
    return (
        <iframe
            src={fileUrl}
            width="100%"
            height="h-full"
            className="border rounded-lg"
        />
    );
}
