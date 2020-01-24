from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import textract
import PyPDF2


def extractPdfText(filePath=''):

    # Open the pdf file in read binary mode.
    fileObject = open(filePath, 'rb')

    # Create a pdf reader .
    pdfFileReader = PyPDF2.PdfFileReader(fileObject)

    # Get total pdf page number.
    totalPageNumber = pdfFileReader.numPages

    # Print pdf total page number.
    # print('This pdf file contains totally ' + str(totalPageNumber) + ' pages.')
    # print(str(pdfFileReader))

    currentPageNumber = 5
    text = ''

    # Loop in all the pdf pages.
    while(currentPageNumber < totalPageNumber):

        # Get the specified pdf page object.
        pdfPage = pdfFileReader.getPage(currentPageNumber)

        # Get pdf page text.
        text = text + pdfPage.extractText()

        # Process next page.
        currentPageNumber += 1

    if(text == ''):
        # If can not extract text then use ocr lib to extract the scanned pdf file.
        text = textract.process(filePath, method='tesseract', encoding='utf-8')

    return text


if __name__ == '__main__':

    pdfFilePath = 'input.pdf'

    pdfText = extractPdfText(pdfFilePath)
    # print(pdfText)
