
import fitz

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=False
)

def extract_sections(pdf_file):
    """
    Extract sections from PDF by a simple heuristic (header starts with 'Header')
    """
    sections = []
    current = {
        "header":None,
        "paragraph":""
    }
    with fitz.open(stream=pdf_file, filetype='pdf') as pdf:

        for page in pdf:
            for block in page.get_text('dict')['blocks']:
                print('block,====>', block)
                for line in block['lines']:
                    spans = line['spans']
                    for span in spans:
                        text = span['text'].strip()
                        size = span['size']
                        # flags= span['flags']
                        # is_bold = bool(flags & 11)

                        if size > 14:
                            if current['header']:
                                sections.append(current.copy())
                            current['header'] = text
                        else:
                            current['paragraph'] += " " + text
        if current['header']:
            sections.append(current)
        return sections

@app.post('/get_pdf')
async def get_pdf(file: UploadFile = File(...)):
    print('file ===?',file.file)
    posted_file = file.file
    posted_file.seek(0)
    posted_file_bytes = posted_file.read()
    sections = extract_sections(posted_file_bytes)
    print('section ===>',sections)
    return sections 