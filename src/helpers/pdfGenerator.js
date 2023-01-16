const PDFDocument = require("pdfkit");
const fs = require("fs");
const appConfig = require("../../config/appConfig");
const winston = require("winston");

const generatePdf = ({ eventName, ownerName, ticketName, time, qrcode }) => {
  if (!fs.existsSync(appConfig.ATTACHMENT))
    fs.mkdirSync(appConfig.ATTACHMENT, { recursive: true });

  if (fs.existsSync(`${appConfig.ATTACHMENT}-ticket.pdf`)) {
    fs.unlink(`${appConfig.ATTACHMENT}-ticket.pdf`, (err) => {
      if (err) winston.error(err);
    });
  }

  const doc = new PDFDocument({
    layout: "landscape",
    size: "A6",
    margins: { top: 0 },
  });

  const writeStream = fs.createWriteStream(
    `${appConfig.ATTACHMENT}-ticket.pdf`
  );

  doc.pipe(writeStream);

  doc.rect(0, 0, doc.page.width, doc.page.height).fill("#fff");

  const distanceMargin = 5;

  doc
    .fillAndStroke("#6699CC")
    .lineWidth(5)
    .lineJoin("round")
    .rect(
      distanceMargin,
      distanceMargin,
      doc.page.width - distanceMargin * 2,
      doc.page.height - distanceMargin * 2
    )
    .stroke();

  doc.fontSize(20).fill("#6699CC").text("Events App Ticket", 210, 80, {
    align: "center",
  });
  doc.fontSize(12).fill("#021c27").text(eventName, 210, 115, {
    align: "center",
  });
  doc.fontSize(10).fill("#021c27").text(ticketName, 210, 135, {
    align: "center",
  });
  doc.fontSize(10).fill("#808080").text(ownerName, 210, 155, {
    align: "center",
  });
  doc.fontSize(10).fill("#808080").text(time, 210, 175, {
    width: 200,
  });

  doc.image(qrcode, 10, 30, {
    fit: [200, 240],
    align: "right",
    valign: "center",
  });

  doc.end();

  return { writeStream, path: `${appConfig.ATTACHMENT}-ticket.pdf` };
};

module.exports = generatePdf;
