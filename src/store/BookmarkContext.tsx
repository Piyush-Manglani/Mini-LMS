import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { getStorageItem, setStorageItem } from '../utils/storage';

interface BookmarkContextType {
    bookmarkedIds: number[];
    toggleBookmark: (courseId: number) => Promise<void>;
    isBookmarked: (courseId: number) => boolean;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

const BOOKMARKS_KEY = 'mini_lms_bookmarks';

export const BookmarkProvider = ({ children }: { children: ReactNode }) => {
    const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);

    useEffect(() => {
        const loadBookmarks = async () => {
            const stored = await getStorageItem<number[]>(BOOKMARKS_KEY);
            if (stored) {
                setBookmarkedIds(stored);
            }
        };
        loadBookmarks();
    }, []);

    const toggleBookmark = async (courseId: number) => {
        setBookmarkedIds((prev) => {
            let newBookmarks;
            if (prev.includes(courseId)) {
                newBookmarks = prev.filter((id) => id !== courseId);
            } else {
                newBookmarks = [...prev, courseId];
                if (newBookmarks.length === 5) {
                    import('../utils/notifications').then(({ scheduleBookmarkNotification }) => {
                        scheduleBookmarkNotification();
                    });
                }
            }
            setStorageItem(BOOKMARKS_KEY, newBookmarks);
            return newBookmarks;
        });
    };

    const isBookmarked = (courseId: number) => bookmarkedIds.includes(courseId);

    return (
        <BookmarkContext.Provider value={{ bookmarkedIds, toggleBookmark, isBookmarked }}>
            {children}
        </BookmarkContext.Provider>
    );
};

export const useBookmarks = () => {
    const context = useContext(BookmarkContext);
    if (context === undefined) {
        throw new Error('useBookmarks must be used within a BookmarkProvider');
    }
    return context;
};
