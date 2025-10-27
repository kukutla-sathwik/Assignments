import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class LibraryServiceTest {

    private LibraryService library;
    private Student student;
    private Book book1, book2;

    @BeforeEach
    void setup() {
        library = new LibraryService();
        student = new Student("S001", "Sathwik");
        book1 = new Book("B001", "Data Structures", "Narasimha Karumanchi", 3);
        book2 = new Book("B002", "Operating Systems", "Galvin", 2);

        library.addStudent(student);
        library.addBook(book1);
        library.addBook(book2);
    }

    @Test
    void testAddBookAndRetrieve() {
        assertEquals(2, library.getAllBooks().size());
        assertTrue(library.getBooksMap().containsKey("B001"));
        assertEquals("Data Structures", library.getBooksMap().get("B001").getTitle());
    }

    @Test
    void testIssueBookSuccess() {
        boolean issued = library.issueBook("S001", "B001");
        assertTrue(issued);
        assertEquals(2, book1.getAvailableCopies());
        assertTrue(student.getBorrowedBooks().contains(book1));
    }

    @Test
    void testIssueBookFailure_NoCopies() {
        // Issue all copies first
        library.issueBook("S001", "B002");
        library.issueBook("S001", "B002");
        boolean result = library.issueBook("S001", "B002");
        assertFalse(result);
    }

    @Test
    void testReturnBook() {
        library.issueBook("S001", "B001");
        boolean returned = library.returnBook("S001", "B001");
        assertTrue(returned);
        assertEquals(3, book1.getAvailableCopies());
        assertFalse(student.getBorrowedBooks().contains(book1));
    }

    @Test
    void testDeleteBook() {
        boolean deleted = library.deleteBook("B002");
        assertTrue(deleted);
        assertFalse(library.getBooksMap().containsKey("B002"));
    }

    @Test
    void testAddAndFindStudent() {
        Student s2 = new Student("S002", "Ravi");
        library.addStudent(s2);
        assertEquals("Ravi", library.getStudentsMap().get("S002").getName());
        assertEquals(2, library.getAllStudents().size());
    }

    @Test
    void testDeleteStudent() {
        boolean removed = library.deleteStudent("S001");
        assertTrue(removed);
        assertFalse(library.getStudentsMap().containsKey("S001"));
    }

    
}
