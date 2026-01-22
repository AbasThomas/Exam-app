package thomas.come.Exam_app.config;

import org.apache.tika.Tika;
import org.apache.tika.exception.TikaException;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;

@Service
public class DocumentParsingService {
    private final Tika tika = new Tika();

    public String extractText(String filePath) throws IOException {
        try {
            return tika.parseToString(new File(filePath));
        } catch (TikaException e) {
            throw new IOException("Failed to parse document: " + e.getMessage());
        }
    }
}
