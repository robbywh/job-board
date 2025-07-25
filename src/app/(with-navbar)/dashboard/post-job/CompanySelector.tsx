'use client'

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/client';
import { Company } from '@/types/database';

interface CompanySelectorProps {
  onCompanySelect: (company: Company | null, isNew: boolean, searchTerm: string) => void;
  onLogoSelect: (file: File | null, preview: string, logoUrl?: string) => void;
  onUploadStateChange: (isUploading: boolean) => void;
  disabled?: boolean;
}

export default function CompanySelector({ onCompanySelect, onLogoSelect, onUploadStateChange, disabled }: CompanySelectorProps) {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isNewCompany, setIsNewCompany] = useState(false);
  const [logoPreview, setLogoPreview] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .order('name');
      
      if (!error && data) {
        setCompanies(data);
        setFilteredCompanies(data);
      }
    };

    fetchCompanies();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setShowDropdown(true);
    
    if (term.trim() === '') {
      setFilteredCompanies(companies);
      setSelectedCompany(null);
      setIsNewCompany(false);
      setLogoPreview('');
      setLogoUrl('');
    } else {
      const filtered = companies.filter(company =>
        company.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredCompanies(filtered);
      
      const exactMatch = companies.find(c => 
        c.name.toLowerCase() === term.toLowerCase()
      );
      
      if (exactMatch) {
        setSelectedCompany(exactMatch);
        setIsNewCompany(false);
        if (exactMatch.logo_url) {
          setLogoPreview(exactMatch.logo_url);
          setLogoUrl(exactMatch.logo_url);
        }
      } else {
        setSelectedCompany(null);
        setIsNewCompany(true);
        setLogoPreview('');
        setLogoUrl('');
      }
    }
    
    onCompanySelect(selectedCompany, !selectedCompany && term.trim() !== '', term);
  };

  const handleCompanySelect = (company: Company) => {
    setSearchTerm(company.name);
    setSelectedCompany(company);
    setIsNewCompany(false);
    setShowDropdown(false);
    
    if (company.logo_url) {
      setLogoPreview(company.logo_url);
      setLogoUrl(company.logo_url);
    } else {
      setLogoPreview('');
      setLogoUrl('');
    }
    
    onCompanySelect(company, false, company.name);
  };

  const handleCreateNew = () => {
    setIsNewCompany(true);
    setSelectedCompany(null);
    setShowDropdown(false);
    setLogoPreview('');
    setLogoUrl('');
    onCompanySelect(null, true, searchTerm);
  };

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Logo file must be less than 2MB');
        return;
      }
      
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'];
      if (!allowedTypes.includes(file.type)) {
        alert('Logo must be a PNG, JPG, or SVG file');
        return;
      }

      setIsUploading(true);
      onUploadStateChange(true);

      try {
        const reader = new FileReader();
        reader.onload = (e) => {
          const preview = e.target?.result as string;
          setLogoPreview(preview);
        };
        reader.readAsDataURL(file);

        const supabase = createClient();
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = `company-logos/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('company-logo')
          .upload(filePath, file);

        if (uploadError) {
          throw new Error('Failed to upload logo');
        }

        const { data: { publicUrl } } = supabase.storage
          .from('company-logo')
          .getPublicUrl(filePath);

        setLogoUrl(publicUrl);
        onLogoSelect(file, logoPreview, publicUrl);
      } catch {
        alert('Failed to upload logo. Please try again.');
        setLogoPreview('');
        setLogoUrl('');
        onLogoSelect(null, '');
      } finally {
        setIsUploading(false);
        onUploadStateChange(false);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="form-control">
        <div className="mb-2">
          <label className="label-text font-medium">Company <span className="text-error">*</span></label>
        </div>
        <div className="relative" ref={dropdownRef}>
          <input 
            type="text" 
            placeholder="Search companies or type new company name"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => setShowDropdown(true)}
            className="input input-bordered w-full focus:input-primary text-base"
            required
            disabled={disabled}
            name="companyName"
          />
          
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-4 h-4 text-base-content/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          {showDropdown && (filteredCompanies.length > 0 || searchTerm.trim()) && (
            <div className="absolute z-50 w-full mt-1 bg-base-100 border border-base-300 rounded-box shadow-xl max-h-44 sm:max-h-48 overflow-y-auto">
              {filteredCompanies.map((company) => (
                <div
                  key={company.id}
                  className="flex items-center gap-3 p-3 sm:p-3 hover:bg-base-200 cursor-pointer transition-colors active:bg-base-300"
                  onClick={() => handleCompanySelect(company)}
                >
                  <div className="avatar flex-shrink-0">
                    <div className="w-8 h-8 rounded bg-base-300">
                      {company.logo_url ? (
                        <Image 
                          src={company.logo_url} 
                          alt={`${company.name} logo`} 
                          width={32}
                          height={32}
                          className="object-cover rounded" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-base-content/60">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{company.name}</p>
                  </div>
                </div>
              ))}
              
              {searchTerm.trim() && !companies.find(c => c.name.toLowerCase() === searchTerm.toLowerCase()) && (
                <div
                  className="flex items-center gap-3 p-3 sm:p-3 hover:bg-primary/10 cursor-pointer transition-colors border-t border-base-300 active:bg-primary/20"
                  onClick={handleCreateNew}
                >
                  <div className="avatar flex-shrink-0">
                    <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-primary text-sm truncate">Create &quot;{searchTerm}&quot;</p>
                    <p className="text-xs text-base-content/60">Add as new company</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        {isNewCompany && searchTerm && (
          <div className="mt-2">
            <span className="label-text-alt text-info flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Creating new company: &quot;{searchTerm}&quot;
            </span>
          </div>
        )}
      </div>

      <div className="form-control">
        <div className="mb-2">
          <label className="label-text font-medium mr-2">Company Logo</label>
          <span className="label-text-alt text-base-content/60 text-xs">Optional • PNG, JPG, SVG • Max 2MB</span>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
          <div className="avatar self-center sm:self-start">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-base-200 flex items-center justify-center flex-shrink-0">
              {logoPreview ? (
                <Image 
                  src={logoPreview} 
                  alt="Company logo preview" 
                  width={64}
                  height={64}
                  className="object-cover rounded-lg" 
                />
              ) : (
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-base-content/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              )}
            </div>
          </div>
          
          <div className="flex-1 w-full sm:w-auto">
            <input 
              type="file" 
              accept=".png,.jpg,.jpeg,.svg"
              onChange={handleLogoChange}
              className="file-input file-input-bordered file-input-sm w-full text-sm"
              disabled={disabled || isUploading}
              name="logo"
            />
            
            {isUploading && (
              <div className="mt-2">
                <div className="alert alert-info py-2 px-3">
                  <span className="loading loading-spinner loading-sm"></span>
                  <span className="text-xs">Uploading logo...</span>
                </div>
              </div>
            )}
            
            {!isNewCompany && selectedCompany && (
              <div className="mt-2">
                <div className="alert alert-info py-2 px-3">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs">Upload a new logo to update the company logo</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <input type="hidden" name="selectedCompanyId" value={selectedCompany?.id || ''} />
      <input type="hidden" name="isNewCompany" value={isNewCompany.toString()} />
      <input type="hidden" name="logoUrl" value={logoUrl} />
    </div>
  );
}