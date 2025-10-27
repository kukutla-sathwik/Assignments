import java.util.*;
public class LibraryService {
    private Map<String, Book> books = new HashMap<>();
    private Map<String, Student> students = new HashMap<>();

    // --- Book Management ---
    public void addBook(Book book) {
        books.put(book.getBookId(), book);
        System.out.println("Book added successfully!");
    }

    public void updateBook(String bookId, String title, String author, int copies) {
        Book existing = books.get(bookId);
        if (existing != null) {
            books.put(bookId, new Book(bookId, title, author, copies));
            System.out.println("Book updated successfully.");
        } else {
            System.out.println("Book not found!");
        }
    }

    public boolean deleteBook(String bookId) {
        if (books.remove(bookId) != null) {
            System.out.println("Book deleted successfully.");
            return true;
        } else {
            System.out.println("Book not found!");
            return false;
        }
    }

    public Collection<Book> getAllBooks() {
        return books.values();
    }

    // --- Student Management ---
    public void addStudent(Student student) {
        students.put(student.getStudentId(), student);
        System.out.println("Student added successfully!");
    }

    public void updateStudent(String studentId, String name) {
        Student s = students.get(studentId);
        if (s != null) {
            students.put(studentId, new Student(studentId, name));
            System.out.println("Student updated successfully.");
        } else {
            System.out.println("Student not found!");
        }
    }

    public boolean deleteStudent(String studentId) {
        if (students.remove(studentId) != null) {
            System.out.println("Student deleted successfully.");
            return true;
        } else {
            System.out.println("Student not found!");
            return false;
        }
    }

    public Collection<Student> getAllStudents() {
        return students.values();
    }

    // --- Issue / Return ---
    public boolean issueBook(String studentId, String bookId) {
        Student student = students.get(studentId);
        Book book = books.get(bookId);

        if (student == null || book == null) {
            System.out.println("Student or Book not found!");
            return false;
        }

        if (!book.isAvailable()) {
            System.out.println("No available copies!");
            return false;
        }

        student.borrowBook(book);
        book.issueCopy();
        System.out.println("Book issued successfully to " + student.getName());
        return true;
    }

    public boolean returnBook(String studentId, String bookId) {
        Student student = students.get(studentId);
        Book book = books.get(bookId);

        if (student == null || book == null) {
            System.out.println("Student or Book not found!");
            return false;
        }

        if (!student.getBorrowedBooks().contains(book)) {
            System.out.println("This student didn’t borrow that book!");
            return false;
        }

        student.returnBook(book);
        book.returnCopy();
        System.out.println("Book returned successfully!");
        return true;
    }

    public Map<String, Book> getBooksMap() {
        return books;
    }

    public Map<String, Student> getStudentsMap() {
        return students;
    }
}
